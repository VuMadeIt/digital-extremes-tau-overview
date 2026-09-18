<?php

function asset_url(string $key): string
{
    static $local;
    static $remote;

    $local ??= require __DIR__ . '/../config/assets.php';
    $remote ??= require __DIR__ . '/../config/assets-remote.php';

    $filename = $local[$key] ?? null;
    if ($filename) {
        $path = __DIR__ . '/../public/assets/overview/' . $filename;
        if (is_file($path) && filesize($path) > 100) {
            return '/assets/overview/' . $filename;
        }
    }

    return $remote[$key] ?? '';
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function view(string $name, array $data = []): string
{
    $path = __DIR__ . '/../resources/views/' . str_replace('.', '/', $name) . '.blade.php';
    if (!is_file($path)) {
        throw new RuntimeException("View [{$name}] not found at {$path}");
    }

    extract($data, EXTR_SKIP);
    ob_start();
    include $path;
    return (string) ob_get_clean();
}

function component(string $name, array $data = []): string
{
    return view('components.' . $name, $data);
}
