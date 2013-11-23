<?php namespace Dosser;

use Illuminate\Support\ServiceProvider;
use Dosser\Repo\FileDossier;

class DosserServiceProvider extends ServiceProvider {

    protected $defer = false;

    public function register()
    {
        $this->app['Dosser\Repo\DossierInterface'] = $this->app->share(function ($app) {

            return new FileDossier($app['wot.dossier'], $app['files'], $app['log']);
        });
    }
}