{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'System log entry', showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  <div class="row">

    <div class="col-sm-3 col-md-3 col-lg-2">
      <h5 class="sm-title">Detail Tabs</h5>
      <ul class="nav nav-pills nav-stacked nav-msg">
        <li role="presentation" class="active">
          <a href="#resource-tab" aria-controls="tab-basic" role="tab" data-toggle="tab">Basic</a>
        </li>
      </ul>
    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="tab-content">
        {% include "tabs/basicTab.swig" %}
      </div>
    </div>

  </div>

{% endblock %}