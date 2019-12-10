# Generated by Django 2.2.6 on 2019-12-09 22:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('variations', '0007_auto_20191206_2019'),
        ('userproducts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userproduct',
            name='variation',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='variation', to='variations.Variation'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='products.Product'),
        ),
    ]
