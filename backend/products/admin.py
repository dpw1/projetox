from django.contrib import admin
from import_export import resources
# Register your models here.
from .models import Product
from import_export.admin import ImportExportModelAdmin
from variations.models import Variation


class ProductResource(resources.ModelResource):

    class Meta:
        model = Product
        fields = ('created_by',
                  'name',
                  'description',
                  'category',
                  'height',
                  'width',
                  'weight',
                  'length',)


class VariationInline(admin.StackedInline):
    model = Variation
    extra = 1


class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
    list_display = ('name', 'id',)
    inlines = [
        VariationInline,
    ]

    def get_changeform_initial_data(self, request):
        return {'name': 'as'}


admin.site.register(Product, ProductAdmin)
