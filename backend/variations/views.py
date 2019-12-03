from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets

from django.shortcuts import render

from .models import Variation
from .serializers import VariationSerializer
from .mixins import CreateListModelMixin


class VariationViewSet(CreateListModelMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Variation.objects.all()
    serializer_class = VariationSerializer
