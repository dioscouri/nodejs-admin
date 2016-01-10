{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Notifications'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">

      {{ search() }}

      <br/>

    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>

        {{ bulk_actions({check: true, bulkDelete: true}) }}

      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Timestamp', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Notification Type', field: 'notificationType'}) }}
            {{ sorting_column({title: 'Resource Type', field: 'resourceType'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">

              <div class="pull-right media-option clearfix">

                <div class="text-right">
                  {% if item.notificationType %}
                    <div class="label label-{{ item.priority }}">{{ item.notificationType }}</div>
                  {% endif %}

                  {{ resource_action_buttons({viewActionUrl: viewActionUrl, deleteActionUrl: deleteActionUrl}) }}
                </div>

                <p class="help-block">
                  <small>{{ moment(item.createdAt).calendar() }}</small>
                </p>

              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.resourceType }}
                </h4>
              </a>

              <p class="text-{{ item.priority }}">{{ item.message }}</p>
              <br>

              {% if item.originator %}
                By: <strong>{{ originator.fullName }}</strong>
                <br>
              {% endif %}
              {% if item.targetUser %}
                Target User: <strong>{{ targetUser.fullName }}</strong>
                <br>
              {% endif %}

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