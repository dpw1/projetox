from django.db import models
from django.conf import settings

# Create your models here.


class Product(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    description = models.TextField()
    category = models.CharField(max_length=15)
    height = models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    length = models.DecimalField(max_digits=10, decimal_places=2)
    update_date = models.DateField(auto_now=True)
    creation_date = models.DateField(auto_now_add=True)
