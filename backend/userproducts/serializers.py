from rest_framework import serializers
from .models import UserProduct


class UserProductSerializer(serializers.ModelSerializer):
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    class Meta:
        model = UserProduct
        fields = ('user',
                  'product',
                  'quantity',
                  'price',
                  'price_mercado_livre',
                  'price_submarino',
                  'update_date',
                  'creation_date',
                  'available',)
