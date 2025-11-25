from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone
from rest_framework.decorators import action
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    @action(detail=False, methods=['get'])
    def due(self, request):
        now = timezone.now()
        qs = Task.objects.filter(schedule_time__lte=now, status='pending')
        ser = self.get_serializer(qs, many=True)
        return Response(ser.data)
