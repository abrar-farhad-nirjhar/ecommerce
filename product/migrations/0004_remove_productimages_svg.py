# Generated by Django 3.1.4 on 2021-01-06 19:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_productimages_svg_models'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productimages',
            name='svg',
        ),
    ]
