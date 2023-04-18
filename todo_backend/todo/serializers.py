from todo.models import Task
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		fields='__all__'
		model=Task