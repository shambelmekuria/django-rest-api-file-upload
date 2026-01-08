from django.urls import path
from .views import UploadCVAPIView

urlpatterns = [
    path("upload-cv/", UploadCVAPIView.as_view(), name="upload-cv")
]
