from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    price = models.IntegerField(default=0)
    main_image = models.URLField(max_length=2000, null=False, blank=False, default="")

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Product_detail", kwargs={"pk": self.pk})

class ProductImages(models.Model):
    product =  models.ForeignKey(Product, on_delete=models.CASCADE)
    face = models.CharField(max_length=50, blank=False, null=False)
    svg = models.TextField(default="")


# class Cart(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

# class CartElements(models):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=0)
#     bought = models.BooleanField(default=False)

