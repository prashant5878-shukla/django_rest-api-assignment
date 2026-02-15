from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("api/employees/", include("employees.urls")),
]
