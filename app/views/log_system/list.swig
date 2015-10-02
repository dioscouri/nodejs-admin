{% extends '../layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'System logs'} %}
{% endblock %}

{% block pagecontent %}
    <h1>System logs</h1>
    <table class="table table-striped table-bordered">
        <thead>
        <tr>
            <th class="col-sm-2">Timestamp</th>
            <th class="col-sm-1">Priority</th>
            <th class="col-sm-2">Category</th>
            <th class="col-sm-7">Message</th>
        </tr>
        </thead>
        <tbody>
        {% if items.length > 0 %}
            {% for row in items %}
                {% set id = row.id %}
                <tr>
                    <td>{{ moment(row.createdAt).format('HH:mm:ss DD-MM-YYYY') }}</td>
                    <td>{{ row.priority }}</td>
                    <td>{{ row.category }}</td>
                    <td>{{ row.message }}</td>
                </tr>
            {% endfor %}
        {% else %}
            <tr>
                <td colspan="4"><h3 class="text-muted">There are no System Logs yet.</h3></td>
            </tr>
        {% endif %}
        </tbody>
    </table>
{% endblock %}
