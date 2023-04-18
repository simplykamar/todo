from django.db import models

# Create your models here.


class Task(models.Model):
	title=models.CharField(max_length=60)
	completed=models.BooleanField(default=False)
	date=models.DateField(auto_now_add=True)