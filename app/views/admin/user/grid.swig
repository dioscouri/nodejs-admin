<br/>
<table class="table table-striped table-bordered">
    <thead>
    <tr>
        <td>Name</td>
        <td>Created At</td>
        <td>Is Admin</td>
        <td width="180px"></td>
    </tr>
    </thead>
    <tbody>
    {% if items.length > 0 %}
        {% for row in items %}
            {% set id = row.id %}
            {% set viewUrl = baseUrl + '/' + row.id %}
            {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
            {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
            <tr>
                <td>{{ row.name.first }} {{ row.name.last }} &lt;{{ row.email }}&gt;</td>
                <td>{{ row.createdAt.toLocaleDateString() }}</td>
                <td>{{ row.isAdmin }}</td>
                <td>
                    <a href="{{ viewUrl }}" class="btn btn-primary btn-xs">View</a>
                    <a href="{{ editUrl }}" class="btn btn-primary btn-xs">Edit</a>
                    <a href="javascript:void(0)"
                       onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}"
                       class="btn btn-danger btn-xs">Delete</a>
                </td>
            </tr>
        {% endfor %}
    {% else %}
        <tr>
            <td colspan="6"><h3 class="text-muted">There are no users yet.</h3></td>
        </tr>
    {% endif %}
    </tbody>
</table>
