from django.contrib import admin

# Register your models here.
from .models import Property
from .models import Reservation
admin.site.register(Property)

admin.site.register(Reservation)