# Generated by Django 3.1.4 on 2021-01-06 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_remove_productimages_svg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimages',
            name='svg_models',
            field=models.ImageField(default='', max_length=1000, upload_to='svgmodels/'),
        ),
    ]
