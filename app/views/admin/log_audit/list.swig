{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Audit logs'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">
      <div class="search-filters">
        {{ search2() }}
        <br/>

        {% include './partials/search-by-resource.swig' %}
        {{ auditLoggingSearchByResource() }}

        {% include './partials/search-by-action.swig' %}
        {{ auditLoggingSearchByAction() }}

        {% include './partials/search-by-user-id.swig' %}
        {{ auditLoggingSearchByUserId() }}

        {{ search_buttons() }}

        <br>
        <pre>{{ filters | json(2) }}</pre>
        <pre>{{ filterData | json(2) }}</pre>
      </div>
    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>
      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Timestamp', field: 'createdAt'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            <div class="list-group-item-body">

              <div class="pull-right media-option">
                <small>{{ moment(item.createdAt).calendar() }}</small>
                {{ resource_action_buttons({deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.resource }}
                </h4>
                <span>
                  ResourceId: {{ item.resourceId.toString() }} User: {{ item.userId.toString() }}
                </span>

                {% if item.diff.length > 0 %}
                  {% set diff = JSON.parse(item.diff) %}
                  <pre>{% for d in diff %}<strong>{{ d.name }}</strong>: "{{ d.from }}" -> "{{ d.to }}"<br>{% endfor %}</pre>
                {% endif %}

                <div>
                  <strong>{{ item.message }}</strong>
                </div>
              </a>

              <p>
                {% if item.isAdmin %}
                  <span class="label label-success">Admin</span>
                {% endif %}
              </p>

            </div>
          </div>
        {% endfor %}

      </div>

      <div class="list-group-footer">
        <div class="pull-right">
          {{ pagination_rows() }}
        </div>
        <div class="pull-left">
          {{ pagination_pages() }}
        </div>
      </div>

    </div>

  </div>

{% endblock %}
