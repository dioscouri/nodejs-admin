<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>{% block title %}{% endblock %}</title>

    <link href="/admin/stylesheets/admin_build.min.css" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="/admin/javascripts/admin_build_lt_ie_9_js.min.js"></script>
    <![endif]-->
</head>

<body>
<header>
    <div class="headerwrapper">
        {% include "partials/header-left.swig" %}
        {% include "partials/header-right.swig" %}
    </div>
</header>
<section>
    {# Reusable components (macro) #}
    {% include "partials/pagination-pages.swig" %}
    {% include "partials/pagination-rows.swig" %}
    {% include "partials/pagination-summary.swig" %}
    {% include "partials/sorting_column.swig" %}
    {% include "partials/search.swig" %}

    <div class="mainwrapper">
        <div class="leftpanel">
            {% include "partials/profile-left.swig" %}
            <h5 class="leftpanel-title">Navigation</h5>
            {% include "partials/left-menu-items.swig" %}
        </div>

        <div class="mainpanel">
            {% block pageheader %}{% include "./partials/pageheader.swig" %}{% endblock %}
            <div class="contentpanel">
                {% include "partials/messages.swig" %}
                {% block pagecontent %}{% endblock %}
            </div>
        </div>
    </div>
    <!-- mainwrapper -->
</section>

<script src="/admin/javascripts/admin_build.min.js"></script>

{% block page_js %}{% endblock %}
</body>
</html>
