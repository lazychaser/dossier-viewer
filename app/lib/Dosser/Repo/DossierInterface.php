<?php namespace Dosser\Repo;

interface DossierInterface {

    function create($path, $original);

    function update($player, $path, $original);

    function get($player);

    function exists($player);

    function player($path);

    function lastModified($player);
}