<form name="itemForm" action="{{ actionUrl }}" method="post">

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">
      <h5 class="sm-title">Detail Tabs</h5>
      <ul class="nav nav-pills nav-stacked nav-msg">
        <li role="presentation" class="active">
          <a href="#tab-basic" aria-controls="tab-basic" role="tab" data-toggle="tab">Basic</a>
        </li>
        {#<li role="presentation">#}
        {#<a href="#tab-2" aria-controls="tab-2" role="tab" data-toggle="tab">Tab 2</a>#}
        {#</li>#}
        {#<li role="presentation">#}
        {#<a href="#tab-3" aria-controls="tab-3" role="tab" data-toggle="tab">Tab 3</a>#}
        {#</li>#}
        {#<li role="presentation">#}
        {#<a href="#tab-4" aria-controls="tab-4" role="tab" data-toggle="tab">Tab 4</a>#}
        {#</li>#}
      </ul>

      {#<h5 class="sm-title">Actions</h5>#}
      {#<a href="" class="btn btn-default btn-block btn-create-msg">Action 1</a>#}
      {#<a href="" class="btn btn-default btn-block btn-create-msg">Action 2</a>#}

      {#<h5 class="sm-title">Sub-Pages</h5>#}
      {#<ul class="nav nav-pills nav-stacked nav-msg">#}
      {#<li>#}
      {#<a href="#">#}
      {#Audit Log#}
      {#<p class="small">The history of changes to this resource</p>#}
      {#</a>#}
      {#</li>#}
      {#</ul>#}

    </div>
    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="tab-content">
        {% include "tabs/basicProps.swig" %}
      </div>
    </div>
  </div>
</form>
