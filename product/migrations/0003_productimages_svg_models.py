# Generated by Django 3.1.4 on 2021-01-06 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_main_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='productimages',
            name='svg_models',
            field=models.FileField(default='', max_length=1000, upload_to='svgmodels/'),
        ),
    ]
