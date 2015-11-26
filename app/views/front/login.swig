<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>{% block title %}{% endblock %}</title>

    <link href="/adminAssets/stylesheets/build.min.css" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="/adminAssets/javascripts/build_lt_ie_9_js.min.js"></script>
    <![endif]-->
</head>

<body class="signin">
    <section>
        <div class="panel panel-signin">
            <div class="panel-body">
                <div class="logo text-center">
                    <h1>{% if title %}{{ title }}{% else %}Login{% endif %}</h1>
                </div>
                <br />
                <h4 class="text-center mb5">Sign in to your account</h4>

                {% include "../admin/partials/messages.swig" %}
                <div class="mb30"></div>
                <form action="/login" method="post">
                    <div class="form-group">
                        <div class="input-group mb15">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" name="email" class="form-control" placeholder="Email" required autofocus data-validation-email-message="Please enter a valid email"
                                   data-validation-required-message="Please enter an email">
                        </div>
                        <p class="help-block"></p>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb15">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" name="password" class="form-control" placeholder="Password" required data-validation-required-message="Please enter a password">
                        </div>
                        <p class="help-block"></p>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left">
                            <div class="ckbox ckbox-primary mt10">
                                <input type="checkbox" id="rememberMe" name="rememberMe" value="1">
                                <label for="rememberMe">Remember Me</label>
                            </div>
                        </div>
                        <div class="pull-right">
                            <button type="submit" class="btn btn-success">Sign In <i class="fa fa-angle-right ml5"></i></button>
                        </div>
                    </div>
                </form>

            </div>
            {% if enableRegistration %}
            <div class="panel-footer">
                <a href="signup" class="btn btn-primary btn-block">Not yet a Member? Create Account Now</a>
            </div>
            {% endif %}
        </div>
    </section>
</body>
</html>
