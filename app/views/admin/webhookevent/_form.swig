<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">

  <div class="form-group">
    <label class="col-sm-2 control-label" for="name">Name</label>

    <div class="col-sm-10">
      <input type="text" id="name" name="name" class="form-control" value="{{ item.name }}" required/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-2 control-label" for="key">Key</label>

    <div class="col-sm-10">
      <input type="text" id="key" name="key" class="form-control" value="{{ item.key }}" required/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-2 control-label"></label>

    <div class="col-sm-10">
      <button type="submit" class="btn btn-success">Save</button>
      <button type="button" class="btn btn-default">Cancel</button>
    </div>
  </div>
</form>