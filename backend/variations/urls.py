from django.urls import include, path
from django.conf.urls import url

from . import views

urlpatterns = [
    path(
        'create/', views.VariationCreate.as_view({'get': 'list', 'post': 'create'})),
]
