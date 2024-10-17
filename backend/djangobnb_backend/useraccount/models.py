from django.db import models
import uuid 
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,UserManager

class CustomUserManager(UserManager):
    def _create_user(self,name,email,password,**extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email=self.normalize_email(email) #normalise the email
        user=self.model(email=email,name=name,**extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user 
    def create_user(self,name=None,email=None,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(name,email,password,**extra_fields)
    
    def create_superuser(self,name=None,email=None,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self._create_user(name,email,password,**extra_fields)
    

class User(AbstractBaseUser,PermissionsMixin):
    id=models.UUIDField(primary_key=True,editable=False,default=uuid.uuid4)
    name=models.CharField(max_length=200,blank=True,null=True)
    email=models.EmailField(unique=True)
    avatar=models.ImageField(upload_to="uploads/avatars")
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
    date_joined=models.DateTimeField(auto_now_add=True)
    last_login=models.DateTimeField(blank=True,null=True)
    objects=CustomUserManager()
    USERNAME_FIELD='email'
    EMAIL_FIELD='email'
    REQUIRED_FIELDS=['name']
    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        else:
            return ""
