{% macro auditLoggingSearchByDateRange() %}

  {% set filterName = 'dateRange' %}

  <div class="form-group">

    {% set filterData = filters.customFilters | find({filterName: filterName}) %}

    <input type="text" class="form-control date-range-picker" data-filter="{{ filterName }}" style="width:100%;font-size:11px;"
           {% if filterData %}value="{{ filterData.filterValue }}"{% endif %}
           placeholder="Filter by date range">
  </div>
{% endmacro %}
