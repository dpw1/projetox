# Generated by Django 2.2.6 on 2019-12-06 23:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('variations', '0006_auto_20191206_1642'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='variation',
            name='description',
        ),
        migrations.RemoveField(
            model_name='variation',
            name='variation_id',
        ),
    ]
