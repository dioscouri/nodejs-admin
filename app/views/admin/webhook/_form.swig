<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
    <div class="form-group">
        <label class="col-sm-2 control-label">Client</label>

        <div class="col-sm-10">
            <select class="width100p" data-placeholder="Choose One" name="clientId" required autofocus>
                <option></option>
                {% for client in clients %}
                    <option value="{{ client.id }}"
                            {% if item.clientId == client.id %}selected{% endif %}>{{ client.name }}</option>
                {% endfor %}
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">User</label>

        <div class="col-sm-10">
            <select class="width100p" data-placeholder="Choose One" name="clientUserId" required autofocus>
                <option></option>
                {% for user in users %}
                    <option value="{{ user.id }}"
                            {% if item.clientUserId == user.id %}selected{% endif %}>{{ user.email }}</option>
                {% endfor %}
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Event</label>

        <div class="col-sm-10">
            <select class="width100p" data-placeholder="Choose One" name="webhookEventId" required>
                <option></option>
                {% for event in webhookevents %}
                    <option value="{{ event.id }}"
                            {% if item.webhookEventId == event.id %}selected{% endif %}>{{ event.name }}</option>
                {% endfor %}
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Url</label>

        <div class="col-sm-10">
            <input type="text" placeholder="Webhook URL" name="url" class="form-control" value="{{ item.url }}"
                   required/>
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