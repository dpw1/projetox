from rest_framework import serializers


from .models import Product
from variations.models import Variation
from variations.serializers import VariationSerializer


class ProductSerializer(serializers.ModelSerializer):
    variation_set = VariationSerializer(
        many=True, read_only=False)

    class Meta:
        model = Product
        fields = ('id', 'created_by', 'name', 'description', 'category', 'height',
                  'width', 'weight', 'length', 'update_date', 'creation_date', 'variation_set',)
