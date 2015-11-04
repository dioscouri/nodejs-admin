{% macro resource_action_buttons(options) %}
  <div class="btn-group">
    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-cog"></i>
    </a>
    <ul class="dropdown-menu pull-right" role="menu">
      {% if options.editActionUrl %}
        <li>
          <a href="{{ options.editActionUrl }}">Edit</a>
        </li>
      {% endif %}

      <li class="divider"></li>
      {% if options.deleteActionUrl %}
        <li>
          <a href="javascript:void(0)" title="Delete"
             onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ options.deleteActionUrl }}';}">
            Delete
          </a>
        </li>
      {% endif %}
    </ul>
  </div>
{% endmacro %}