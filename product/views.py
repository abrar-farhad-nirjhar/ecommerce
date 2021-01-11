from django.shortcuts import render
from .models import *
from django.views import View
from django.core import serializers
from django.http import JsonResponse


# Create your views here.

def home(request):
    return render(request, 'home.html', context = {
        'products':Product.objects.all()
    })


class ProductPage(View):
    def get(self, request, id=None):
        product = Product.objects.get(pk=id)
        product_images = ProductImages.objects.filter(product=product)
        return render(request, 'product.html', context={
            "product":product,
            "product_images":product_images
        })


def get_product_images(request, id=None):
    data = ProductImages.objects.filter(product__id=id)
    return JsonResponse({"images":serializers.serialize('json', data )})


def add_to_cart(request):
    print(request.body)

    return JsonResponse({'done':True})

def invoice(request):
    return render(request, 'invoice.html')

def checkout(request):
    return render(request, 'checkout.html')

def userInvoice(request):
    return render(request, 'userInvoice.html')