from django.contrib import admin
from .models import Variation
# Register your models here.


class VariationAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_product_name', 'ean',)

    def get_product_name(self, obj):
        return obj.product.name


admin.site.register(Variation, VariationAdmin)
