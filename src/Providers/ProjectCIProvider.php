<?php

namespace Lukasmundt\ProjectCI\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class ProjectCIProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(Router $router)
    {
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'projectci');
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }
}