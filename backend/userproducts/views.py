from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import filters


from .models import UserProduct
from .serializers import UserProductSerializer
# Create your views here.


class UserProductViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = UserProduct.objects.all()
    serializer_class = UserProductSerializer

    def list(self, request):
        user_id = self.request.user.id
        queryset = UserProduct.objects.filter(user=user_id)
        serializer = UserProductSerializer(queryset, many=True)
        return Response(serializer.data)
