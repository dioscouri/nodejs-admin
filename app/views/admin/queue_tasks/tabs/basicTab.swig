<div class="tab-pane active" id="mainProps">

  <h4>Basic info</h4>

  <div class="row">
    <div class="col-sm-12">
      <div class="form-group">
        <label class="col-sm-2 control-label">Worker Name</label>

        <div class="col-sm-10">
          <input type="text" name="workerName" class="form-control"
                 value="{{ item.queue }}" required autofocus/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Command</label>

        <div class="col-sm-10">
          <input type="text" name="commandName" class="form-control"
                 value="{{ item.name }}" required/>
        </div>
      </div>
    </div>
  </div>

</div>
