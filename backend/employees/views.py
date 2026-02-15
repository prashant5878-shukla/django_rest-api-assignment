from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .mongo import employee_collection, attendance_collection
from .serializers import EmployeeSerializer, AttendanceSerializer
from datetime import datetime


# =============================
# EMPLOYEE CRUD
# =============================

class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = list(employee_collection.find({}, {"_id": 0}))
        return Response(employees)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        # prevent duplicate employee_id
        if employee_collection.find_one(
            {"employee_id": serializer.validated_data["employee_id"]}
        ):
            return Response(
                {"error": "Employee already exists"},
                status=400,
            )

        employee_collection.insert_one(serializer.validated_data)
        return Response({"message": "Employee created"})


class EmployeeDetailView(APIView):
    def put(self, request, emp_id):
        serializer = EmployeeSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        result = employee_collection.update_one(
            {"employee_id": emp_id},
            {"$set": serializer.validated_data},
        )

        if result.matched_count == 0:
            return Response({"error": "Employee not found"}, status=404)

        return Response({"message": "Employee updated"})

    def delete(self, request, emp_id):
        result = employee_collection.delete_one({"employee_id": emp_id})

        if result.deleted_count == 0:
            return Response({"error": "Employee not found"}, status=404)

        return Response({"message": "Employee deleted"})


# =============================
# ATTENDANCE
# =============================


class AttendanceView(APIView):
    def post(self, request, emp_id):
        data = request.data.copy()
        data["employee_id"] = emp_id

        serializer = AttendanceSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        validated = serializer.validated_data

        # ✅ FIX: convert date → datetime
        validated["date"] = datetime.combine(
            validated["date"],
            datetime.min.time()
        )

        attendance_collection.insert_one(validated)
        return Response({"message": "Attendance marked"})

    def get(self, request, emp_id):
        records = list(
            attendance_collection.find(
                {"employee_id": emp_id},
                {"_id": 0},
            )
        )
        return Response(records)

