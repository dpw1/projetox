from django.conf.urls import url
from django.contrib import admin

from .views import (meli_playground,)

urlpatterns = [
    url(r'^$', meli_playground, name='list'),
]
