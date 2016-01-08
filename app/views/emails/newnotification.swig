{% extends 'layout.swig' %}

{% block body %}

  <p>
    {{ notification | json }}
  </p>

{% endblock %}