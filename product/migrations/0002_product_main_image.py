# Generated by Django 3.1.4 on 2021-01-06 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='main_image',
            field=models.URLField(default='', max_length=2000),
        ),
    ]