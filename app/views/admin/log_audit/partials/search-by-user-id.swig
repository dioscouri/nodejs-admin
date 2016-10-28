{% macro auditLoggingSearchByUserId() %}

  {% set filterName = 'inFieldUserId' %}

  <div class="form-group">

    {% set filterData = filters.inField | find({filterName: filterName}) %}

    <input type="text" data-filter="{{ filterName }}" style="width:100%"
           {% if filterData %}value="{{ filterData.fieldValue }}"{% endif %}
           data-placeholder="Filter by user ID">
  </div>
{% endmacro %}
