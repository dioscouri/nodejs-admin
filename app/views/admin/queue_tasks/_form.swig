<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
    <div class="form-group">
        <label class="col-sm-2 control-label">Worker Name</label>
        <div class="col-sm-10">
            <input type="text" placeholder="Worker Name" name="workerName" class="form-control" value="{{ item.workerName }}" required autofocus />
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Command</label>
        <div class="col-sm-10">
            <input type="text" placeholder="Command Name" name="commandName" class="form-control" value="{{ item.commandName }}" required />
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label"></label>
        <div class="col-sm-10">
            <button type="submit" class="btn btn-success">Save</button>
            <a class="btn btn-default" href="{{ baseUrl }}" role="button">Cancel</a>
        </div>
    </div>
</form>