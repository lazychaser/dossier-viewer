<!DOCTYPE html>
<html>
<head>
    <title>@lang('app.brand')</title>
    <link rel="stylesheet" href="{{ asset('css/styles.min.css') }}">
</head>
<body>
    <p class="app-loading" id="loading"></p>
    
    <script src="{{ asset('js/lang.'.Config::get('app.locale').'.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>