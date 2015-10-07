{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Webhook Events (view)'} %}
{% endblock %}

{% block pagecontent %}

    <div class="row">
        <div class="col-xs-12">
            <div class="btn-group pull-right">
                <button type="submit" class="btn btn-success" onclick="document.location.href = '{{ createUrl }}'">
                    Create New
                </button>
            </div>
        </div>
    </div>

    <table class="table table-striped table-bordered">
        <thead>
        <tr>
            <td width="25%">Name</td>
            <td width="25%">Key</td>
            <td width="120px"></td>
        </tr>
        </thead>
        <tbody>
        {% if items.length > 0 %}
            {% for row in items %}
                {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
                {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
                <tr>
                    <td>{{ row.name }}</td>
                    <td>{{ row.key }}</td>
                    <td>
                        <a href="{{ editUrl }}" class="btn btn-primary btn-xs">Edit</a>
                        <a href="javascript:void(0)" class="btn btn-danger btn-xs"
                           onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}">Delete</a>
                    </td>
                </tr>
            {% endfor %}
        {% else %}
            <tr>
                <td colspan="6"><h3 class="text-muted">There are no webhook events.</h3></td>
            </tr>
        {% endif %}
        </tbody>
    </table>

{% endblock %}
