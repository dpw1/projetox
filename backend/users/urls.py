from django.urls import include, path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.UserList.as_view()),
    path('<int:pk>/', views.UserDetail.as_view()),
    # path('<int:pk>/products/', views.UserProductsList.as_view()),
    path('authenticate/', views.CustomObtainAuthToken.as_view()),
]
