<form class="form-horizontal" action="{{ actionUrl }}" method="post" enctype="multipart/form-data">
    <div class="row">
        <div class="form-group">
            <label class="col-sm-4 control-label">Asset Name</label>

            <div class="col-sm-4">
                <input type="text" class="form-control" name="name" placeholder="Enter Asset Name"
                       value="{{ item.name }}" required autofocus>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-4 control-label">File</label>

            <div class="col-sm-4">
                <input type="file" class="form-control" name="file" required>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-4 col-sm-4">
                <button type="submit" class="btn btn-success">Save <i
                        class="fa fa-angle-right"></i></button>
            </div>
        </div>
    </div>
</form>
