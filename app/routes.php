<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('ember');
});

Route::group(array('prefix' => '-'), function () {

    Route::post('upload', array(
        'as' => 'upload', 
        'uses' => 'DossierController@upload',
    ));
});

Route::get('{player}', function ($player) {

    return Redirect::to('/#/'.$player);
})
->where('player', '[a-zA-Z0-9_]+');

Route::get('{player}.json', array(
    'as' => 'dossier.json', 
    'uses' => 'DossierController@json',
))
->where('player', '[a-zA-Z0-9_]+');