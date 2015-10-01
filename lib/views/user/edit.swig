{% extends '../layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Users Management'} %}
{% endblock %}

{% block pagecontent %}
    <h1>Edit User</h1>

    <div class="panel">
        <div class="panel-body">

            {% include "_form.swig" %}

        </div>
        <!-- panel-body -->
    </div><!-- panel -->

{% endblock %}
