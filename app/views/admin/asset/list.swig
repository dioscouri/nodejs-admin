{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "../partials/pageheader.swig" with { 'pageTitle': 'Assets Management'} %}
{% endblock %}

{% block pagecontent %}
<h1>Assets Management</h1>

    <a href="{{ createUrl }}">[create]</a>
    <br />
    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th class="col-sm-3">Name</th>
                <th class="col-sm-8">URL</th>
                <th class="col-sm-1">Actions</th>
            </tr>
        </thead>
        <tbody>
            {% if items.length > 0 %}
                {% for row in items %}
                    {% set id = row.id %}
                    {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
                    {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
                    <tr>
                        <td>{{ row.name }}</td>
                        <td>{{ row.cdnUrl }}</td>
                        <td class="table-action">
                            <a href="{{ editUrl }}" data-toggle="tooltip" title="Edit" class="tooltips"
                               data-original-title="Edit"><i class="fa fa-pencil"></i></a>
                            <a href="javascript:void(0)" data-toggle="tooltip" title="" class="delete-row tooltips"
                               data-original-title="Delete"
                               onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}"><i
                                    class="fa fa-trash-o"></i></a>
                        </td>
                    </tr>
                {% endfor %}
            {% else %}
                <tr>
                    <td colspan="6"><h3 class="text-muted">There are no Asset yet.</h3></td>
                </tr>
            {% endif %}
        </tbody>
    </table>

{% endblock %}
