{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Webhook Events Management - Create New Webhook Event'} %}
{% endblock %}

{% block pagecontent %}
    <div class="panel">
        <div class="panel-body">
            {% include "_form.swig" %}
        </div>
    </div>
{% endblock %}
