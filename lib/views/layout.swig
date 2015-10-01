<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>{% block title %}{% endblock %}</title>

    <link href="/assets/css/style.default.css" rel="stylesheet">
    <link href="/assets/css/select2.css" rel="stylesheet">
    <link href="/assets/css/custom.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="assets/js/html5shiv.js"></script>
    <script src="assets/js/respond.min.js"></script>
    <![endif]-->

    <script src="/assets/js/jquery-1.11.1.min.js"></script>
    <script src="/assets/js/jquery-migrate-1.2.1.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <script src="/assets/js/modernizr.min.js"></script>
    <script src="/assets/js/pace.min.js"></script>
    <script src="/assets/js/retina.min.js"></script>
    <script src="/assets/js/select2.min.js"></script>
    <script src="/assets/js/jquery.cookies.js"></script>
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
                {% include "../common/partials/messages.swig" %}
                {% block pagecontent %}{% endblock %}
            </div>
        </div>
    </div>
    <!-- mainwrapper -->
</section>

<script src="/assets/js/custom.js"></script>

{% block page_js %}{% endblock %}
</body>
</html>
