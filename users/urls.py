from django.urls import path, include
from .views import *

urlpatterns = [
    path('signin', SignIn.as_view(), name="signin"),
    path('signup', SignUp.as_view(), name="signup"),
    path('signout', signout, name="signout")
]
