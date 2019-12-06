from rest_framework import serializers


from .models import Product
from variations.models import Variation
from variations.serializers import VariationSerializer


class ProductSerializer(serializers.ModelSerializer):

    # variations = VariationSerializer(many=True)
    variation_set = VariationSerializer(
        many=True, read_only=False)
    # variations = serializers.SerializerMethodField('get_variation')

    # def get_variation(self, obj):
    #     variations = Variation.objects.all()
    #     serializer = VariationSerializer(
    #         variations)
    #     return serializer.data

    # def validate_variation_set(self, value):
    #     print('VARIATIOOOOOOOOOOOOOOOOON set')
    #     print(self)

    def validate_name(self, value):
        print('NAMEEEEEEEEEE set')

    class Meta:
        model = Product
        fields = ('created_by', 'id', 'name', 'description', 'category', 'height',
                  'width', 'weight', 'length', 'update_date', 'creation_date', 'variation_set',)
