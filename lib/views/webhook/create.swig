{% extends '../layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Webhooks Management - Create New Webhook'} %}
{% endblock %}

{% block pagecontent %}
    <div class="panel">
        <div class="panel-body">
            {% include "_form.swig" %}
        </div>
    </div>
{% endblock %}
