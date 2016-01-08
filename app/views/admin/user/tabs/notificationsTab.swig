<div class="tab-pane" id="tab-tags">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Allowed notifications</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">

            <label class="control-label" for="notifications">Notifications</label>
            <select class="form-control select2" name="notifications" multiple style="width:100%">

              <option value="ALL" {% if item.notifications.indexOf("ALL") !== -1 %}selected{% endif %}>
                ALL
              </option>

              {% for notificationType in notificationTypes %}
                <option value="{{ notificationType }}"
                        {% if item.notifications.indexOf(notificationType) !== -1 %}selected{% endif %}>
                  {{ notificationType }}
                </option>
              {% endfor %}

            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


