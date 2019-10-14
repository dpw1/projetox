from django.contrib.auth.models import AbstractUser
from django.db import models
from .choices import COUNTRY_CHOICES


class CustomUser(AbstractUser):
    address = models.CharField(max_length=300)
    country = models.IntegerField(choices=COUNTRY_CHOICES, default=1)
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=15)
    nif = models.CharField(max_length=11)
    iban = models.CharField(max_length=40)
    birth_date = models.DateField(blank=True, null=True)
    update_date = models.DateField(auto_now=True)
    picture = models.ImageField('images/', blank=True, null=True)
    phone_number = models.CharField(max_length=40)
