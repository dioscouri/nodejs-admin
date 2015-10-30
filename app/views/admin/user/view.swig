{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'View User'} %}
{% endblock %}

{% block pagecontent %}
    <h1>View User</h1>

    <div class="panel">
        <div class="panel-body">

            <div class="form-group">
                <div class="col-xs-offset-9 col-xs-3">
                    <div class="btn-toolbar pull-right">
                        <div class="btn-group">
                            <button type="button" class="btn btn-success" onclick="document.location.href = '/admin/users'">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                        <input type="text" class="form-control" name="email" value="{{ item.email }}" disabled>
                    </div>
                    <!-- input-group -->
                </div>
                <div class="col-sm-6">
                    <div class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-star"></i></span>
                        <input type="text" class="form-control" name="_id" value="{{ item._id.toString() }}" disabled>
                    </div>
                    <!-- input-group -->
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" name="firstName" placeholder="Enter Firstname"
                               value="{{ item.name.first }}" disabled>
                    </div>
                    <!-- input-group -->
                </div>
                <div class="col-sm-6">
                    <div class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" name="lastName" placeholder="Enter Lastname"
                               value="{{ item.name.last }}" disabled>
                    </div>
                    <!-- input-group -->
                </div>
            </div>
            <!-- row -->
            <br/>

        </div>
        <!-- panel-body -->
    </div><!-- panel -->

{% endblock %}
