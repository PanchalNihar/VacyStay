from rest_framework import serializers 
from .models import Property,Reservation
from useraccount.serializers import UserDetailSerializer  

class PropertyListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('id', 'title', 'price_per_night', 'image_url')

class PropertiesDetailSerializers(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True)

    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url',
            'description',
            'bathrooms',
            'bedrooms',
            'guests',
            'landlord'
        )

class ReservationsListSerializers(serializers.ModelSerializer):
    property=PropertyListSerializers(read_only=True,many=False)
    class Meta:
        model = Reservation
        fields=(
            "id",
            "start_date",
            "end_date",
            "number_of_nights",
            "total_price",
            "property",
        )















# Serializers are used to convert complex data, 
# like model instances, into native Python data 
# types that can be easily rendered into JSON or
#  other content types

#meta class
#In Serializers: You can use it to define which 
# fields of a model should be shown when converting it to JSON.