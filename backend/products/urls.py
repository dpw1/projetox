from django.urls import include, path
from django.conf.urls import url
from rest_framework.routers import SimpleRouter

from . import views


router = SimpleRouter()
router.register('', views.ProductViewSet, base_name='products')
urlpatterns = router.urls
