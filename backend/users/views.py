from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from products.models import Product
from products.serializers import ProductSerializer
from .models import CustomUser
from .serializers import UserSerializer
# Create your views here.


class UserList(generics.ListAPIView):
    permission_classes = (IsAdminUser, )
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser, )
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserProductsList(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ProductSerializer

    def get_queryset(self):
        id = self.kwargs['pk']
        return Product.objects.filter(created_by__id=id)


# class UserProductsDetail(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = ProductSerializer

#     def get_queryset(self):
#         id = self.kwargs['pk']
#         product_id = self.request.query_params.get('productid', None)
#         print('product id', product_id)
#         products = Product.objects.filter(id=product_id)
#         return products

class UserProductsCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ProductSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(
            request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})
