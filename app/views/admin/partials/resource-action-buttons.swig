{% macro resource_action_buttons(options) %}
  {% if options.editUrl %}
    <a href="{{ options.editUrl }}" class="btn btn-primary btn-xs" title="Edit">
      <i class="fa fa-pencil"></i>
    </a>
  {% endif %}
  {% if options.deleteUrl %}
    <a href="javascript:void(0)" class="btn btn-danger btn-xs" title="Delete"
       onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ options.deleteUrl }}';}">
      <i class="fa fa-times"></i>
    </a>
  {% endif %}
{% endmacro %}
