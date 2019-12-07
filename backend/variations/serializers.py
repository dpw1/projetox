from rest_framework import serializers
from .models import Variation

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer


class VariationSerializer(serializers.ModelSerializer):

    def validate_product_id(self, data):
        print(data)

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if len(data['ean']) > 13:
            raise serializers.ValidationError(
                "The EAN code can not have more than 13 digits.")
        return data

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(VariationSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = Variation
        fields = ('product_id',
                  'id',

                  'ean',
                  'sku',
                  'name',

                  'picture_1',
                  'update_date',
                  'creation_date',)
