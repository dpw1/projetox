from django.contrib import admin
from import_export import resources
from django.db import IntegrityError
# Register your models here.
from .models import Product
from import_export.admin import ImportExportModelAdmin
from variations.models import Variation


class ProductResource(resources.ModelResource):
    def save_instance(self, instance, using_transactions=True, dry_run=False):
        name = self.__class__
        try:
            super(name, self).save_instance(
                instance, using_transactions, dry_run)
        except IntegrityError:
            pass

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
        export_order = fields


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
