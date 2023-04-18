from django.shortcuts import render
from todo.models import Task
from todo.serializers import TaskSerializer 
from rest_framework.viewsets import ModelViewSet
# Create your views here.


class TaskCRUDView(ModelViewSet):
	serializer_class=TaskSerializer
	queryset=Task.objects.all()