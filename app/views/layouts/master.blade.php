<!DOCTYPE html>
<html>
<head>
    <title>@yield('title', trans('app.brand'))</title>
    <link rel="stylesheet" href="{{ asset('css/styles.min.css') }}">
</head>
<body>
    <nav class="navbar navbar-fixed-top navbar-default" role="navigation">
        <a href="{{ url('/') }}" class="navbar-brand">{{ trans('app.brand') }}</a>

        <!--<ul class="nav navbar-nav pull-right">
            <li><a href="#">{{ trans('user.signin') }}</a></li>
        </ul>-->
    </nav>

    <div class="main-content-narrow">@yield('content')</div>

@if (Config::get('app.debug'))
    <script src="{{ asset('js/scripts.js') }}"></script>
@else
    <script src="{{ asset('js/scripts.min.js') }}"></script>
@endif
    @yield('scripts')
</body>
</html>