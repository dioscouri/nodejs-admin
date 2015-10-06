{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Webhook Events (view)'} %}
{% endblock %}

{% block pagecontent %}

    <table class="table table-striped table-bordered">
        <thead>
        <tr>
            <td width="25%">Name</td>
            <td width="25%">Key</td>
            <td>Description</td>
        </tr>
        </thead>
        <tbody>
        {% if items.length > 0 %}
            {% for row in items %}
                <tr>
                    <td>{{ row.name }}</td>
                    <td>{{ row.key }}</td>
                    <td>{{ row.description }}</td>
                </tr>
            {% endfor %}
        {% else %}
            <tr>
                <td colspan="6"><h3 class="text-muted">There are no webhook events.</h3></td>
            </tr>
        {% endif %}
        </tbody>
    </table>

    <a href="/admin/webhookevents/createTestData">Create test webhook events data...</a>

{% endblock %}
