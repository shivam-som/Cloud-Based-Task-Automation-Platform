from django.db import models
class Task(models.Model):
    STATUS_CHOICES = [('pending','pending'),('running','running'),('done','done'),('failed','failed')]
    name = models.CharField(max_length=200)
    schedule_time = models.DateTimeField()
    payload = models.JSONField(default=dict)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.name} ({self.status})"
