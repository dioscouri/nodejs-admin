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
    <div class="panel panel-signup">

        <div class="panel-body">
            <div class="logo text-center">
                <h1>{% if title %}{{ title }}{% else %}Signup{% endif %}</h1>
            </div>
            <br />
            <h4 class="text-center mb5">Create a new account</h4>
            <p class="text-center">Please enter your credentials below</p>

            {% include "../admin/partials/messages.swig" %}

            <div class="mb30"></div>

            <form id="signUpForm" action="/signup" method="post">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <div class="input-group mb15">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" name="firstName" placeholder="Enter First name" data-validator-required-message="Please enter a First name" required="" autofocus=""
                                       data-validation-required-message="Please enter a first name"  value="{{ userObject.name.first }}" />
                            </div><!-- input-group -->
                            <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <div class="input-group mb15">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" name="lastName" placeholder="Enter Last name" required
                                       data-validation-required-message="Please enter a last name"  value="{{ userObject.name.last }}" />
                            </div><!-- input-group -->
                            <p class="help-block"></p>
                        </div>
                    </div>
                </div><!-- row -->
                <br />
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="input-group mb15">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                <input type="email" class="form-control" name="email" placeholder="Enter Email Address" data-validation-email-message="Please enter a valid email" required
                                       data-validation-required-message="Please enter an email"   value="{{ userObject.email }}" />
                            </div>
                            <p class="help-block"></p>
                        </div>
                    </div>
                </div><!-- row -->
                <br />
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <div class="input-group mb15">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input type="password" class="form-control"
                                       id="password"
                                       name="password"
                                       placeholder="Enter Password"
                                       required=""
                                       data-validation-required-message="Please enter a password"
                                       minlength="{{ userPasswordMinLength }}"
                                />
                            </div>
                            <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <div class="input-group mb15">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input type="password"
                                       class="form-control"
                                       id="passwordConfirmation"
                                       name="passwordConfirmation"
                                       placeholder="Confirm Password"
                                       data-validation-match-match="password"
                                       data-validation-match-message="Must match password entered above"
                                />
                            </div>
                            <p class="help-block"></p>
                        </div>
                    </div>
                </div><!-- row -->
                <br />
                <div class="clearfix">
                    <div class="pull-left">
                        <div class="ckbox ckbox-primary mt5">
                            <input type="checkbox" id="agree" value="1" required data-validation-required-message="You must agree to the terms and conditions">
                            <label for="agree">I agree with <a href="">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <div class="pull-right">
                        <button type="submit" class="btn btn-success">Create New Account <i class="fa fa-angle-right ml5"></i></button>
                    </div>
                </div>
            </form>

        </div><!-- panel-body -->
        <div class="panel-footer">
            <a href="login" class="btn btn-primary btn-block">Already a Member? Sign In</a>
        </div><!-- panel-footer -->
    </div><!-- panel -->


    <script type="text/javascript">
        $('#companyName').blur(function(event){
            var tenantIdText = $('#companyName').val();
            tenantIdText = tenantIdText.replace(/[\s]+/gi, '-');
            var valueValidated = tenantIdText.replace(/[^a-z0-9\_\-]/gi, '').toLowerCase();
            $('#tenantId').val(valueValidated);
        });
        $('#tenantId').blur(function(event){
            var tenantIdText = $('#tenantId').val();
            tenantIdText = tenantIdText.replace(/[\s]+/gi, '-');
            var valueValidated = tenantIdText.replace(/[^a-z0-9\_\-]/gi, '').toLowerCase();
            $('#tenantId').val(valueValidated);
        });
    </script>
</section>
</body>
</html>
