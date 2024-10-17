from django.forms import ModelForm
from .models import Property

class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
            'title',
            'description',
            'price_per_night',
            'bedrooms',
            'bathrooms',
            'guests',
            'country',
            'country_code',
            'category',
            'image'
        )



#meta class 
#In Models: You can use a Meta class to
#  specify the table name in the database or set the default order of the records.