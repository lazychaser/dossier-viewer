<!DOCTYPE html>
<html>
<head>
    <title>@lang('app.brand')</title>
    <link rel="stylesheet" href="{{ asset('css/styles.min.css') }}">
</head>
<body>
    <p class="app-loading" id="loading"></p>
    
    <script src="{{ asset('js/lang.'.Config::get('app.locale').'.js') }}"></script>
    <script src="{{ asset('js/'.(Config::get('app.debug') ? 'app' : 'app.min').'.js') }}"></script>

@if ($ga = Config::get('app.ga'))
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', {{ $ga }}, '151.248.113.220');
      ga('send', 'pageview');

    </script>
@endif
</body>
</html>