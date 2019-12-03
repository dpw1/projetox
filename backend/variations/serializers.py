from rest_framework import serializers
from .models import Variation

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer


class VariationSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(VariationSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = Variation
        fields = ('product',
                  'id',
                  'variation_id',
                  'ean',
                  'sku',
                  'name',
                  'quantity',
                  'price',
                  'price_mercado_livre',
                  'price_submarino',
                  'description',
                  'picture_1',
                  'update_date',
                  'creation_date',)
