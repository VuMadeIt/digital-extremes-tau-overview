<?php

declare(strict_types=1);

// Let PHP's built-in server handle real static files.
if (PHP_SAPI === 'cli-server') {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $file = __DIR__ . $path;
    if ($path !== '/' && is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../bootstrap/helpers.php';
require __DIR__ . '/../app/Http/Controllers/OverviewController.php';

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$normalized = rtrim($uri, '/') ?: '/';

$routes = require __DIR__ . '/../routes/web.php';
$key = $method . ' ' . $normalized;
$handler = $routes[$key] ?? null;

if (!$handler) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not Found';
    exit;
}

[$class, $action] = $handler;
$controller = new $class();
header('Content-Type: text/html; charset=utf-8');
echo $controller->{$action}();
