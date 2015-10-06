{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Notifications'} %}
{% endblock %}

{% block pagecontent %}

    <div class="row">
        <div class="col-xs-6">
            {{ search() }}
        </div>
    </div>

    <br>
    <table class="table table-striped table-bordered">
        <thead>
        <tr>
            <th class="col-sm-2">Timestamp</th>
            <th class="col-sm-1">Notification Type</th>
            <th class="col-sm-1">Resource Type</th>
            <th class="col-sm-1">From</th>
            <th class="col-sm-1">Target</th>
            <th class="col-sm-6">Message</th>
        </tr>
        </thead>
        <tbody>
        {% if items.length > 0 %}
            {% for row in items %}
                {% set id = row.id %}
                {% set originatorName = '-' %}
                {% if row.originator != null %}
                    {% set originatorName = row.originator.fullName %}
                {% endif %}
                {% set targetUserName = '-' %}
                {% if row.targetUser != null %}
                    {% set targetUserName = row.targetUser.fullName %}
                {% endif %}
                <tr>
                    <td>{{ moment(row.createdAt).format('HH:mm:ss DD-MM-YYYY') }}</td>
                    <td>{{ row.notificationType }}</td>
                    <td>{{ row.resourceType }}</td>
                    <td>{{ originatorName }}</td>
                    <td>{{ targetUserName }}</td>
                    <td>{{ row.message }}</td>
                </tr>
            {% endfor %}
        {% else %}
            <tr>
                <td colspan="6"><h3 class="text-muted">There are no Notifications yet.</h3></td>
            </tr>
        {% endif %}
        </tbody>
    </table>

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

