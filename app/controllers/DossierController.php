<?php

use Dosser\Repo\DossierInterface;
use Carbon\Carbon;

class DossierController extends BaseController {

    protected $dossier;

    protected $hasGzip;

    public function __construct(DossierInterface $dossier)
    {
        $this->dossier = $dossier;
        $this->hasGzip = function_exists('gzencode');
    }

    public function view($player)
    {
        if (!$this->dossier->exists($player)) App::abort(404);

        return View::make('dossier.view', compact('player'));
    }

    public function upload()
    {
        $file = Request::file('file');

        if (is_null($file)) App::abort(400);

        $original = $file->getClientOriginalName();

        list(, $player) = Dossier::meta($original);

        $dossier = $player 
            ? $this->dossier->create($file->getPathname(), $original)
            : false;

        if (Request::ajax())
        {
            $status = 'ok';

            if ($dossier === false)
            {
                $status = 'fail';
                $error = 'CONVERT_FAILED';
            }
            else
            {
                $data = $dossier->toArray();
            }

            return Response::json(compact('status', 'error', 'data'));
        }

        if (false === $dossier)
        {
            return Redirect::to('/')->withError();
        }

        return Redirect::to($dossier->player);
    }

    public function json($player)
    {
        if (!$this->dossier->exists($player)) App::abort(404);

        $lastModified = $this->dossier->lastModified($player);
        $lastModified = Carbon::createFromTimestamp($lastModified);

        $request = Request::getFacadeRoot();
        $response = with(Response::make())
            ->header('Content-Type', 'application/json')
            ->setPublic()
            ->setLastModified($lastModified)
            ->setExpires($lastModified->addDay());

        if ($response->isNotModified($request)) return $response;

        $dossier = $this->dossier->get($player);

        if ($dossier->isOutdated())
        {
            return Response::json(array(
                'error' => trans('app.dossier.outdated'),
            ), 505);
        }

        $data = $dossier->toJson();

        if ($this->hasGzip && in_array('gzip', Request::getEncodings()))
        {
            $data = gzencode($data);
            $response->header('Content-Encoding', 'gzip');
        }

        return $response
            ->header('Content-Length', strlen($data))
            ->setContent($data);
    }
}