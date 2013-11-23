@extends('layouts.master')

@section('title'){{ $player }}@stop

@section('content')
<div id="dossier">
    <p class="dossier-enable-js">@lang('app.enablejs')</p>
</div>
@stop

@section('scripts')
<script>$.dossier('#dossier', '{{ route('dossier.json', $player) }}');</script>
@stop