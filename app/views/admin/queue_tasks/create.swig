{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Queue Tasks - Create New Task'} %}
{% endblock %}

{% block pagecontent %}
<div class="panel">
    <div class="panel-body">
        {% include "_form.swig" %}
    </div>
</div>
{% endblock %}
