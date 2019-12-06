from django.db import models
from django.conf import settings

from products.models import Product


class UserProduct(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.IntegerField()
    price_mercado_livre = models.IntegerField()
    price_submarino = models.IntegerField()
    update_date = models.DateField(auto_now=True)
    creation_date = models.DateField(auto_now_add=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return "%s (%s)" % (self.user, self.product)
