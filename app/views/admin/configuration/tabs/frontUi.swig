<div class="tab-pane" id="frontui">

    <h4>Front UI</h4>

    <div class="form-group">
        <label class="col-sm-2 control-label">Require Login</label>
        <div class="col-sm-10">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="requireLogin" class="form-control"
                           {% if item.frontui.requireLogin %}checked{% endif %} />
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">Enable registration</label>
        <div class="col-sm-10">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="enableRegistration" class="form-control"
                           {% if item.frontui.enableRegistration %}checked{% endif %} />
                </label>
            </div>
        </div>
    </div>

</div>
