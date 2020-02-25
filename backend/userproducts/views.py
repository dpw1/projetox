from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import filters


from .models import UserProduct
from .serializers import UserProductSerializer
from .mixins import CreateListModelMixin
from .services import get_todos
# Create your views here.

import json


class UserProductViewSet(CreateListModelMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = UserProduct.objects.all()
    serializer_class = UserProductSerializer
    lookup_field = 'product'

    def list(self, request):
        user_id = self.request.user.id
        queryset = UserProduct.objects.filter(user=user_id)
        serializer = UserProductSerializer(queryset, many=True)
        # testing!
        # print(json.loads(get_todos()))
        return Response(serializer.data)
