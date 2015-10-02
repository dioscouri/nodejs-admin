<div class="tab-pane" id="pkgcloud">

    <h4>pkg Cloud settings</h4>

    <div class="form-group">
        <label class="col-sm-2 control-label">Provider</label>

        <div class="col-sm-10">
            <input type="text" name="pkgcloudProvider" class="form-control"
                   value="{{ item.pkgcloud.provider }}"/>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">API Key</label>

        <div class="col-sm-10">
            <input type="text" name="pkgcloudApiKey" class="form-control"
                   value="{{ item.pkgcloud.apiKey }}"/>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">Username</label>

        <div class="col-sm-10">
            <input type="text" name="pkgcloudUserName" class="form-control"
                   value="{{ item.pkgcloud.userName }}"/>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">Region</label>

        <div class="col-sm-10">
            <input type="text" name="pkgcloudRegion" class="form-control"
                   value="{{ item.pkgcloud.region }}"/>
        </div>
    </div>
</div>
