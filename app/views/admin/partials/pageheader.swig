<div class="pageheader">
    <div class="media">
        <div class="pageicon pull-left">
            <i class="fa fa-home"></i>
        </div>
        <div class="list-group-item-body">
            <ul class="breadcrumb">
                <li><a href=""><i class="glyphicon glyphicon-home"></i></a></li>
                <li><a href="">Admin</a></li>
                <li></li>
            </ul>
            <h4 class="pull-left">{% if pageTitle %}{{pageTitle}}{% else %}Blank Page{% endif %}</h4>
            <div class="pull-right">
                {% if showSaveButton %}
                <button type="submit" class="btn btn-primary">Save</button>
                {% endif %}
                {% if showEditButton %}
                <a href="{{ editActionUrl }}" class="btn btn-default">Edit</a>
                {% endif %}
                {% if showCloseButton %}
                <a href="{{ cancelActionUrl }}" class="btn btn-link">Close</a>
                {% endif %}
            </div>
        </div>
    </div>
</div>