from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _ 

# Create your models here.

class User(AbstractUser):
    cv = models.FileField(_("CV"), upload_to='cvs/', blank=True,null=True)
    uploaded_at = models.DateTimeField(blank=True,null=True)
