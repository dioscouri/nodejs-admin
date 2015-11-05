<div class="tab-pane active" id="mainProps">

  <h4>Basic info</h4>

  <div class="row">
    <div class="col-sm-12">

      <div class="form-group">
        <label class="col-sm-4 control-label">Acl Resource Name</label>

        <div class="col-sm-4">
          <input type="text" class="form-control" name="name" value="{{ item.name }}" required
                 autofocus>
        </div>
      </div>

      <div id="resource-actions">
        {% for action in item.actions %}
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-4">
              <input type="text" class="form-control" name="actions" value="{{ action }}">
              <a href="#" class="remove_resource_action">Remove action</a>
            </div>
          </div>
        {% endfor %}
      </div>

      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-4">
          <button class="btn btn-xs add_resource_action"><i class="fa fa-plus"></i> Add Action</button>
        </div>
      </div>

    </div>
  </div>

</div>
