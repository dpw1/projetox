from rest_framework import serializers
from .models import UserProduct
from variations.models import Variation


class UserProductSerializer(serializers.ModelSerializer):
    variations_count = serializers.SerializerMethodField(source='variation')
    ean = serializers.CharField(source='variation.ean', read_only=True)
    sku = serializers.CharField(source='variation.sku', read_only=True)
    name = serializers.CharField(source='product.name', read_only=True)

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(UserProductSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = UserProduct
        fields = ('id',
                  'user',
                  'product',
                  'variation',
                  'name',
                  'ean',
                  'sku',
                  'variations_count',
                  'quantity',
                  'price',
                  'price_mercado_livre',
                  'price_submarino',
                  'update_date',
                  'creation_date',
                  'available',)

    def get_variations_count(self, userProduct):
        return 0
