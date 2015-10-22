<ul class="nav nav-pills nav-stacked">

  <li>
    <a href="/"><i class="fa fa-home"></i> <span>Front UI</span></a>
  </li>

  {% if loggedUser %}
    {% if loggedUser.isAdmin %}

      {% for item in navigation %}
        <li class="{% if item.descendants %} parent {% endif %}">
          <a href="{{ item.url || '#' }}">
            <i class="fa {{ item.icon }}"></i> <span>{{ item.name }}</span>
          </a>

          {% if item.descendants %}
            <ul class="children">
              {% for children in item.descendants %}
                <li>
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
