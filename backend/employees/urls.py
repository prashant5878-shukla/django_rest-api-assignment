from django.urls import path
from .views import (
    EmployeeListCreateView,
    EmployeeDetailView,
    AttendanceView,
)

urlpatterns = [
    path("", EmployeeListCreateView.as_view()),
    path("<str:emp_id>/", EmployeeDetailView.as_view()),
    path("attendance/", AttendanceView.as_view()),
    path("attendance/<str:emp_id>/", AttendanceView.as_view()),
]
