from rest_framework import serializers
from .models import UserProduct


class UserProductSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(UserProductSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = UserProduct
        fields = ('user',
                  'product',
                  'variation',
                  'quantity',
                  'price',
                  'price_mercado_livre',
                  'price_submarino',
                  'update_date',
                  'creation_date',
                  'available',)
