from django.db import models
from products.models import Product
# Create your models here.


class Variation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation_id = models.CharField(max_length=50)
    ean = models.CharField(max_length=13)
    sku = models.CharField(max_length=50)
    name = models.CharField(max_length=300)
    quantity = models.IntegerField()
    price = models.IntegerField()
    price_mercado_livre = models.IntegerField()
    price_submarino = models.IntegerField()
    description = models.TextField()
    picture_1 = models.ImageField(blank=True, null=True)
    update_date = models.DateField(auto_now=True)
    creation_date = models.DateField(auto_now_add=True)
