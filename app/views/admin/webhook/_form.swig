<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
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