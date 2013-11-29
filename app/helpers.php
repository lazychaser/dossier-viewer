<?php

if (!function_exists('script'))
{
    function script($name) {

        if (!Config::get('app.debug')) $name .= '.min';

        return '<script src="'.asset('js/'.$name.'.js').'"></script>';
    }
}