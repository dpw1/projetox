# Generated by Django 2.2.6 on 2019-11-28 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('variations', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Variations',
            new_name='Variation',
        ),
    ]
