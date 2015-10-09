{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pagecontent %}

  <div class="panel panel-signin">
    <div class="panel-body">

      <br/>
      <h4 class="text-center mb5">Already a Member?</h4>

      <p class="text-center">Sign in to your account</p>

      <div class="mb30"></div>
      <form action="/admin/login" method="post">
        <div class="form-group">
          <div class="input-group mb15">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input type="email" name="email" class="form-control" placeholder="Email" required autofocus
                   data-validation-email-message="Please enter a valid email"
                   data-validation-required-message="Please enter an email">
          </div>
          <p class="help-block"></p>
        </div>
        <div class="form-group">
          <div class="input-group mb15">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input type="password" name="password" class="form-control" placeholder="Password" required
                   data-validation-required-message="Please enter a password">
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
    <!-- panel-body -->
    <div class="panel-footer">
      <a href="/signup" class="btn btn-primary btn-block">Not yet a Member? Create Account Now</a>
    </div>
    <!-- panel-footer -->
  </div><!-- panel -->


{% endblock %}
