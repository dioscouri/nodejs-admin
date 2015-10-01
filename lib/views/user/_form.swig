<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">

    <div class="form-group">
        <div class="col-xs-offset-9 col-xs-3">
            <div class="btn-toolbar pull-right">
                <div class="btn-group">
                    <button type="submit" id="submitButton" class="btn btn-success">Save</button>
                    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                        {#<span class="sr-only">Toggle Dropdown</span>#}
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#" onclick="javascript:save('save&CreateAnother');">Save & Create Another</a></li>
                        {% if isEditMode %}
                            <li><a href="#" onclick="javascript:save('saveAs');">Save As</a></li>
                        {% endif %}
                        <li><a href="#" onclick="javascript:save('save&Close');">Save & Close</a></li>
                    </ul>
                </div>

                <div class="btn-group">
                    <button type="button" class="btn btn-success" onclick="document.location.href = '/admin/users'">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="tabbable">
            <ul class="nav nav-pills nav-stacked col-md-3">
                <li class="active"><a href="#mainProps" data-toggle="tab">Main properties</a></li>
                <li><a href="#extraProps" data-toggle="tab">Extra properties</a></li>
            </ul>
            <div class="tab-content col-md-9">
                {% include "tabs/mainProps.swig" %}
                {% include "tabs/extraProps.swig" %}
            </div>
        </div>
    </div>

    <script>
        function save(action) {
            $('#saveAction').val(action);
            $("#submitButton").click();
        }
    </script>

    <input type="hidden" id="saveAction" name="saveAction" value="save"/>
</form>
