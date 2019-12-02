from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


from .models import Product
from .serializers import ProductSerializer
# Create your views here.


class ProductList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
