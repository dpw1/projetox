from django.urls import include, path
from django.conf.urls import url

from . import views
from userproducts.views import UserProductViewSet

urlpatterns = [
    path('', views.UserList.as_view()),
    path('<int:pk>/', views.UserDetail.as_view()),
    path('<int:pk>/products/',
         UserProductViewSet.as_view({'get': 'list'})),
    path('authenticate/', views.CustomObtainAuthToken.as_view()),
]
