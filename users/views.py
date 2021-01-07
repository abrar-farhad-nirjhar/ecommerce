from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout




# Create your views here.

class SignIn(View):
    def get(self,request):
        if request.user.is_authenticated:
            return redirect('home')
        return render(request, 'signin.html')
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        print(username)
        print(password)
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            error_message="Username or password is incorrect!"
            return render(request, 'signin.html', context={"error_message":error_message})



class SignUp(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('home')
        return render(request, 'signup.html')
    def post(self, request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password') 
        try:
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return render(request, 'signin.html')
        except:
            error_message = "Something went wrong! Please try again."
            if User.objects.filter(username=username):
                error_message = "Username already in use!"

            return render(request, 'signup.html', context={"error_message":error_message})



def signout(request):
    logout(request)
    return redirect('home')
