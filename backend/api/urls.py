from django.urls import path, include
from users.views import UserList


urlpatterns = [
    path('users/', UserList.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/',
         include('rest_auth.registration.urls')),
]