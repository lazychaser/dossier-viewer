@extends('layouts.master')

@section('content')
<h1>@lang('app.welcome.header')</h1>
<p>@lang('app.welcome.body')</p>

<div class="form-upload-wrap">
{{ Form::open(array('route' => 'upload', 'method' => 'post', 'files' => true, 'class' => 'form-upload')) }}
    {{ Form::file('file', array('class' => 'dossier-file')) }}
    <button type="submit" class="btn btn-lg btn-primary">{{ trans('app.dossier.upload') }}</button>
{{ Form::close() }}
</div>
@stop