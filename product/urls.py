from django.urls import path, include
from .views import *

urlpatterns = [
    path("", home, name="home"),
    path('product/<id>', ProductPage.as_view(), name="product_page"),
    path('images/<id>', get_product_images, name="product-images"),
    path('addtocard', add_to_cart, name="add-to-cart"),
    path('invoice', invoice, name="invoice"),
    path('checkout', checkout, name="checkout"),
    path('user-invoice', userInvoice, name="userInvoice"),
    path('manager-invoice', managerInvoice, name="managerInvoice"),
]