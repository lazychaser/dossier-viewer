<?php namespace Dosser\Repo;

use Kalnoy\Wot\Dossier\Environment;
use Kalnoy\Wot\Dossier\Dossier;
use Kalnoy\Wot\Dossier\Converters\Exception as ConverterException;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Log\Writer as Log;

class FileDossier implements DossierInterface {

    protected $dossier;

    protected $file;

    protected $log;

    public function __construct(Environment $dossier, Filesystem $file, Log $log)
    {
        $this->dossier = $dossier;
        $this->file = $file;
        $this->log = $log;

        $this->ensureStorage();
    }

    public function create($path, $original)
    {
        if (false === $data = $this->convert($path, $original)) return false;

        $this->store($data);

        $this->log->info("Dossier created for ".$data->player);

        return $data;
    }

    public function update($player, $path, $original)
    {
        $this->create($path, $original);

        return true;
    }

    public function get($player)
    {
        $path = $this->storage($player);

        if (!$this->file->exists($path)) return null;

        return @unserialize($this->file->get($path));
    }

    public function exists($player)
    {
        return $this->file->exists($this->storage($player));
    }

    protected function store(Dossier $data)
    {
        $path = $this->storage($data->player);

        $this->file->put($path, serialize($data));

        return true;
    }

    public function convert($path, $original)
    {
        try
        {
            return $this->dossier->convert($path, $original);
        }
        catch (ConverterException $e) {}

        return false;
    }

    public function player($path)
    {
        list(, $player) = $this->dossier->meta($path);

        return $player;
    }

    public function lastModified($player)
    {
        return $this->file->lastModified($this->storage($player));
    }

    protected function ensureStorage()
    {
        $dir = $this->storage();

        if (!$this->file->isDirectory($dir))
        {
            $this->file->makeDirectory($dir);
        }

        if (!$this->file->isWritable($dir))
        {
            throw new \Exception("Make shure that directory {$dir} is writable.");
        }
    }

    protected function storage($player = null)
    {
        $path = storage_path('dossiers');

        if ($player !== null) $path .= '/'.$player.'.dat';

        return $path;
    }
}