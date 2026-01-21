from rest_framework import serializers
from .models  import User,File
from django.utils import timezone

class CVUploadSerializer(serializers.ModelSerializer):
    uploaded_at = serializers.DateTimeField(read_only = True)
    class Meta:
        model = User
        fields =['cv','uploaded_at']
        
    def update(self, instance, validated_data):
        instance.uploaded_at = timezone.now()
        return super().update(instance, validated_data)
    

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file']
    

