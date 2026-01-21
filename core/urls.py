from django.urls import path
from .views import UploadCVAPIView,FileListCreateAPIView

urlpatterns = [
    path("upload-cv/", UploadCVAPIView.as_view(), name="upload-cv"),
    path("file/", FileListCreateAPIView.as_view(), name="file")
]
