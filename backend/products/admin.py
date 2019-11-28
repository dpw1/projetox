from django.contrib import admin

# Register your models here.
from .models import Product
from variations.models import Variation


class VariationInline(admin.StackedInline):
    model = Variation
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        VariationInline,
    ]

    def get_changeform_initial_data(self, request):
        return {'name': 'as'}


admin.site.register(Product, ProductAdmin)
