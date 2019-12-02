from rest_framework import serializers
from .models import Product

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('created_by', 'id', 'name', 'description', 'category', 'height',
                  'width', 'weight', 'length', 'update_date', 'creation_date')
