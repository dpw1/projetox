from rest_framework import serializers

from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import Product
from variations.models import Variation
from variations.serializers import VariationSerializer


class ProductSerializer(WritableNestedModelSerializer):
    variations = VariationSerializer(
        many=True, read_only=False)

    class Meta:
        model = Product
        fields = ('id', 'created_by', 'name', 'description', 'category', 'height',
                  'width', 'weight', 'length', 'update_date', 'creation_date', 'variations',)
