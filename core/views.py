from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import CVUploadSerializer,FileSerializer
from .models import User,File
from rest_framework.generics import ListCreateAPIView


class UploadCVAPIView(APIView):
    serializer_class = CVUploadSerializer
    parser_classes  = [MultiPartParser,FormParser]
    

    def post(self, request):
        request.user = User.objects.first()  # For testing
        serializer = self.serializer_class(request.user, data=request.data) # Update exiting Users SS   
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class FileListCreateAPIView(ListCreateAPIView):
    serializer_class = FileSerializer
    parser_classes = [MultiPartParser,FormParser]
    queryset = File.objects.all()