---
layout: default
title: 'Home'
visible: false
---

<ul class="list-reset">
  {% for p in site.pages  %}
    {% if p.visible %}
    <li>
    <a href="{{ p.url }}"> {{ p.title }} </a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
