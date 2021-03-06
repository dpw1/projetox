from django.urls import path, include
from django.conf.urls import url

# All urls have "api/v1" as a prefix.
# This is coming from projectx_project.
urlpatterns = [
    path('meli/', include('meli.urls')),
    path('users/', include('users.urls')),
    path('products/', include('products.urls')),
    path('variations/', include('variations.urls')),
    path('userproducts/', include('userproducts.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/',
         include('rest_auth.registration.urls')),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
]
