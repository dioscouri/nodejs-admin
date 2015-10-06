{% extends '../layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
{% include "../partials/pageheader.swig" with { 'pageTitle': 'Queue Tasks Archive' } %}
{% endblock %}

{% block pagecontent %}
{{ search() }}
<br>

<table class="table table-striped table-bordered">
    <thead>
    <tr>
        <td width="60px">Priority</td>
        {{ sorting_column({title: 'Created', field: 'enqueued', width: '140px'}) }}
        {{ sorting_column({title: 'Completed', field: 'ended', width: '140px'}) }}
        {{ sorting_column({title: 'Worker', field: 'queue'}) }}
        {{ sorting_column({title: 'Command', field: 'name'}) }}
        {{ sorting_column({title: 'Status', field: 'status'}) }}
        <th width="30px">Actions</th>
    </tr>
    </thead>
    <tbody>
    {% if items.length > 0 %}
    {% for row in items %}
    <tr>
        <td>{{ row.priority }}</td>
        <td>{{ moment(row.enqueued).format('YYYY-MM-DD hh:mm:ss') }}</td>
        <td>{{ moment(row.ended).format('YYYY-MM-DD hh:mm:ss') }}</td>
        <td>{{ row.queue }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.status }}</td>
        <td style="text-align: center">
            <a href="#" class="btn btn-default btn-xs" data-toggle="modal" data-target="#rawModal" data-raw='{{ JSON.stringify(row)  }}'>...</a>
        </td>
    </tr>
    {% endfor %}
    {% else %}
    <tr>
        <td colspan="6">Nothing to see here</td>
    </tr>
    {% endif %}
    </tbody>
</table>

<div class="row">
    <div class="col-xs-5">
        {{ pagination_summary() }}
    </div>
    <div class="col-xs-2">
        {{ pagination_rows() }}
    </div>
    <div class="col-xs-5">
        <span class="pull-right">
            {{ pagination_pages() }}
        </span>
    </div>
</div>

<div class="modal fade" id="rawModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <pre>...</pre>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

{% endblock %}

{% block page_js %}
<script>

    $('#rawModal').on('show.bs.modal', function (event) {
        var modal = $(this),
                button = $(event.relatedTarget),
                raw = button.data('raw');

        modal.find('.modal-body').find('pre').html(JSON.stringify(raw, null, 3));
    })

</script>
{% endblock %}