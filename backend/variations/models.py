from django.db import models
from products.models import Product
# Create your models here.


class Variation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    price = models.IntegerField()
    price_mercado_livre = models.IntegerField()
    price_submarino = models.IntegerField()
    description = models.TextField()
    update_date = models.DateField(auto_now=True)
    creation_date = models.DateField(auto_now_add=True)
