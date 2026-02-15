from rest_framework import serializers


class EmployeeSerializer(serializers.Serializer):
    employee_id = serializers.CharField()
    full_name = serializers.CharField()
    email = serializers.EmailField()
    department = serializers.CharField()


class AttendanceSerializer(serializers.Serializer):
    employee_id = serializers.CharField()
    date = serializers.DateField()
    status = serializers.ChoiceField(
        choices=["Present", "Absent"]
    )
