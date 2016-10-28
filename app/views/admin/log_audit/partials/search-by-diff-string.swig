{% macro auditLoggingSearchByDiffString() %}

  {% set filterName = 'customDiffString' %}

  <div class="form-group">

    {% set filterData = filters.customFilters | find({filterName: filterName}) %}

    <input type="text" class="form-control" data-filter="{{ filterName }}" style="width:100%"
           value="{% if filterData %}{{ filterData.filterValue }}{% endif %}"
           placeholder="Filter by diff string">
  </div>
{% endmacro %}
