{% macro sorting_column(options) %}
  {% if sorting.field == options.field %}
    <a class="btn btn-link sorting"
       href="{{ sorting.basePath }}?filter[sortingField]={{ options.field }}&filter[sortingOrder]={% if sorting.order == 'asc' %}desc{% else %}asc{% endif %}"
            >
      {{ options.title }} ({{ sorting.order }})
    </a>
  {% else %}
    <a class="btn btn-link sorting"
       href="{{ sorting.basePath }}?filter[sortingField]={{ options.field }}&filter[sortingOrder]=asc"
            >
      {{ options.title }}
    </a>
  {% endif %}
{% endmacro %}