{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Webhooks Management'} %}
{% endblock %}

{% block pagecontent %}

    <div class="row">
        <div class="col-xs-6">
            <div class="btn-group">
                <button type="button" class="btn btn-default">Bulk Actions</button>
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Edit selected rows</a></li>
                    <li><a href="#">Delete selected rows</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Deselect all</a></li>
                </ul>
            </div>
        </div>
        <div class="col-xs-6">
            <a href="{{ createUrl }}" class="btn btn-success pull-right">Create New</a>
        </div>
    </div>
    <br>
    <table class="table table-striped table-bordered">
        <thead>
        <tr>
            <td width="25%">Event</td>
            <td width="30%">Url</td>
            <td width="120px"></td>
        </tr>
        </thead>
        <tbody>
        {% if items.length > 0 %}
            {% for row in items %}
                {% set id = row.id %}
                {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
                {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
                <tr>
                    <td>{{ row.webhookEventId.name }}</td>
                    <td>{{ row.url }}</td>
                    <td>
                        <a href="{{ editUrl }}" class="btn btn-primary btn-xs">Edit</a>
                        <a href="javascript:void(0)" class="btn btn-danger btn-xs"
                           onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}">Delete</a>
                    </td>
                </tr>
            {% endfor %}
        {% else %}
            <tr>
                <td colspan="6"><h3 class="text-muted">There are no webhooks yet.</h3></td>
            </tr>
        {% endif %}
        </tbody>
    </table>
{% endblock %}
