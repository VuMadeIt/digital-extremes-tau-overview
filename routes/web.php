<?php

use App\Http\Controllers\OverviewController;

return [
    'GET /' => [OverviewController::class, 'index'],
    'GET /overview' => [OverviewController::class, 'index'],
];
