{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {% include "../partials/pageheader.swig" with { 'pageTitle': 'Audit logs'} %}
{% endblock %}

{% block pagecontent %}
  <h1>Audit logs</h1>
  <table class="table table-striped table-bordered">
    <thead>
    <tr>
      <th class="col-sm-2">Timestamp</th>
      <th class="col-sm-1">Resource</th>
      <th class="col-sm-2">ResourceId</th>
      <th class="col-sm-2">UserId</th>
      <th class="col-sm-3">Diff</th>
      <th class="col-sm-2">Message</th>
    </tr>
    </thead>
    <tbody>
    {% if items.length > 0 %}
      {% for row in items %}
        {% set id = row.id %}
        <tr>
          <td>{{ moment(row.createdAt).format('HH:mm:ss DD-MM-YYYY') }}</td>
          <td>{{ row.resource }}</td>
          <td>{{ row.resourceId.toString() }}</td>
          <td>{{ row.userId.toString() }}</td>
          <td>
            {% if row.diff.length > 0 %}
              {% set diff = JSON.parse(row.diff) %}
              {% for d in diff %}
                <strong>{{ d.name }}</strong>: "{{ d.from }}" -> "{{ d.to }}"<br>
              {% endfor %}
            {% endif %}
          </td>
          <td>{{ row.message }}</td>
        </tr>
      {% endfor %}
    {% else %}
      <tr>
        <td colspan="4"><h3 class="text-muted">There are no Audit Logs yet.</h3></td>
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
