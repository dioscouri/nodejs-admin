<ul class="nav nav-pills nav-stacked">
    <li>
        <a href="/"><i class="fa fa-home"></i> <span>Front UI</span></a>
    </li>
    {% if loggedUser %}
        {% if loggedUser.isAdmin %}
            {% for item in navigation %}
                {% set activeParentItem = false %}
                {% set hasItemIdInUrl = originalUrl.search("[0-9a-f]{24}") != -1 %}
                {% if item.url == originalUrl || originalUrl.indexOf(item.url + '/') == 0 && item.url !== '/admin' && !item.descendants %}
                    {% set activeParentItem = true %}
                {% else %}
                    {% if item.descendants %}
                        {% for children in item.descendants %}
                            {% if children.url == originalUrl || originalUrl.indexOf(children.url + '?') == 0 || children.url + '/create' == originalUrl || originalUrl.indexOf(children.url + '/') == 0 && hasItemIdInUrl %}
                                {% set activeParentItem = true %}
                            {% endif %}
                        {% endfor %}
                    {% endif %}
                {% endif %}
                <li class="{% if item.descendants %} parent {% endif %} {% if activeParentItem %}active{% endif %}">
                    <a href="{{ item.url || '#' }}">
                        <i class="fa {{ item.icon }}"></i> <span>{{ item.name }}</span>
                    </a>

                    {% if item.descendants %}
                    <ul class="children">
                        {% for children in item.descendants %}
                        <li class="{% if children.url == originalUrl || originalUrl.indexOf(children.url + '?') == 0 || children.url + '/create' == originalUrl ||originalUrl.indexOf(children.url + '/') == 0 && hasItemIdInUrl %}active{% endif %}">
                            <a href="{{ children.url }}">
                                <i class="fa {{ children.icon }}"></i> <span>{{ children.name }}</span>
                            </a>
                        </li>
                        {% endfor %}
                    </ul>
                    {% endif %}
                </li>
            {% endfor %}
        {% else %}
        <li>
            <a href="/admin/login"><i class="fa fa-user"></i> <span>Signin</span></a>
        </li>
        {% endif %}
    {% endif %}
</ul>
