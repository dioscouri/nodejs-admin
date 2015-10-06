{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Users Management'} %}
{% endblock %}

{% block pagecontent %}

    <div class="row">
        <div class="col-xs-6">
            {{ search() }}
        </div>
        <div class="col-xs-6">
            <div class="btn-group pull-right">
                <button type="submit" class="btn btn-success" onclick="document.location.href = '{{ createUrl }}'">
                    Create New
                </button>
            </div>
        </div>
    </div>


    {% include "grid.swig" %}

    <div class="row">
        <div class="col-xs-5">
            {{ pagination_summary() }}
        </div>
        <div class="col-xs-2">
            {{ pagination_rows() }}
        </div>
        <div class="col-xs-5">
        <span class="pull-right">
            {{ pagination_pages() }}
        </span>
        </div>
    </div>

{% endblock %}
