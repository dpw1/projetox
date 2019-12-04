from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('created_by', 'id', 'name', 'description', 'category', 'height',
                  'width', 'weight', 'length', 'update_date', 'creation_date')
