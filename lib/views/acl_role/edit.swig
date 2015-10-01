{% extends '../layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Users Management'} %}
{% endblock %}

{% block pagecontent %}
    <h1>Create Acl Role</h1>

    <div class="panel">
        <div class="panel-body">
            <form class="form-horizontal" action="{{ actionUrl }}" method="post">
                <div class="row">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">Acl Resource Name</label>

                        <div class="col-sm-4">
                            <input type="text" class="form-control" name="name" placeholder="Enter Resource Name"
                                   value="{{ item.name }}" required autofocus>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-4 col-sm-4">
                            <button type="submit" class="btn btn-success">Create New Acl Resource <i
                                        class="fa fa-angle-right"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

{% endblock %}
