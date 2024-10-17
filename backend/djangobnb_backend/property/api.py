from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Property, Reservation
from .forms import PropertyForm
from .serializers import PropertyListSerializers, PropertiesDetailSerializers, ReservationsListSerializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from useraccount.models import User
from rest_framework_simplejwt.tokens import AccessToken

# View to list properties based on various filters
@api_view(['GET'])
@authentication_classes([])  
@permission_classes([])      
def properties_list(request):
    
    try:
        token = request.META['HTTP_AUHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload('user_id')  
        user = User.objects.get(pk=user_id) 
    except Exception as e:
        user = None  # If there's an issue with the token, set user to None
    print('user:', user)

    favourites = []  # List to store favorite property IDs
    properties = Property.objects.all()  # Get all properties from the database

    # Get filter parameters from the request
    is_favourite = request.GET.get('is_favourite', '')
    landlord_id = request.GET.get('landlord_id', '')
    country = request.GET.get('country', '')
    category = request.GET.get('category', '')
    checkin_date = request.GET.get('checkIn', '')
    checkout_date = request.GET.get('checkOut', '')
    guests = request.GET.get('numGuests', '')
    bathrooms = request.GET.get('numBathrooms', '')
    bedrooms = request.GET.get('numBedrooms', '')

    # Filter properties based on availability (checkin and checkout dates)
    if checkin_date and checkout_date:
        exact_matches = Reservation.objects.filter(start_date=checkin_date) | Reservation.objects.filter(end_date=checkout_date)
        overlap_matches = Reservation.objects.filter(start_date__lte=checkout_date, end_date__gte=checkin_date)
        all_matches = []

        # Add IDs of properties with conflicting reservations
        for reservation in exact_matches | overlap_matches:
            all_matches.append(reservation.property_id)
        properties = properties.exclude(id__in=all_matches)  # Exclude properties with conflicts

    # Apply additional filters based on request parameters
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    if is_favourite:
        properties = properties.filter(favorited__in=[user])
    if guests:
        properties = properties.filter(guests__gte=guests)
    if bedrooms:
        properties = properties.filter(bedrooms__gte=bedrooms)
    if bathrooms:
        properties = properties.filter(bathrooms__gte=bathrooms)
    if country:
        properties = properties.filter(country=country)
    if category and category != 'undefined':
        properties = properties.filter(category=category)

    # Add favorite properties to the list if the user is authenticated
    if user:
        for property in properties:
            if user in property.favorited.all():
                favourites.append(property.id)

    # Serialize the properties data
    serializer = PropertyListSerializers(properties, many=True)
    return JsonResponse({
        'data': serializer.data,
        'favourites': favourites
    })


# View to get detailed information of a specific property
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # JWT authentication required
@permission_classes([IsAuthenticated])  # User must be authenticated
def properties_detail(request, pk):
    try:
        property_instance = Property.objects.get(pk=pk)  # Get the property by primary key
    except Property.DoesNotExist:
        return JsonResponse({'error': 'Property not found'}, status=404)  # Return error if not found

    # Serialize the property details
    serializer = PropertiesDetailSerializers(property_instance)
    return JsonResponse(serializer.data)


# View to create a new property
@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # This means the view will only accept requests authenticated with a valid JWT token.
@permission_classes([IsAuthenticated])  # This means the view will only be accessible to authenticated users.
def create_property(request):
    print("Received POST data:", request.POST)
    print("Received FILE data:", request.FILES)

    # Create form instance with POST and FILES data
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():  # Check if form data is valid
        property = form.save(commit=False)  # Save the form but don't commit yet
        property.landlord = request.user  # Assign the current user as the landlord
        property.save()  # Save the property instance to the database
        return JsonResponse({'success': True})
    else:
        print("Form errors:", form.errors)  # Debugging line for form errors
        return JsonResponse({'errors': form.errors.as_json()}, status=400)


# View to get all reservations of a specific property
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # This means the view will only accept requests authenticated with a valid JWT token.
@permission_classes([IsAuthenticated])  # This means the view will only be accessible to authenticated users.
def property_reservations(request, pk):
    try:
        property = Property.objects.get(pk=pk)  # Get the property by primary key
        reservations = property.reservations.all()  # Get all reservations related to the property
        serializer = ReservationsListSerializers(reservations, many=True)
        return JsonResponse({'data': serializer.data})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


# View to book a property for a specific period
@api_view(["POST"])
def book_property(request, pk):
    try:
        # Get booking details from POST data
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        number_of_nights = request.POST.get('number_of_nights')
        total_price = request.POST.get('total_price')
        guests = request.POST.get('guests')

        # Get the property instance
        property = Property.objects.get(pk=pk)

        # Create a new reservation
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=int(number_of_nights),
            total_price=float(total_price),
            guests=int(guests),
            created_by=request.user  # Set the current user as the creator of the reservation
        )
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


# View to toggle favorite status of a property for a user
@api_view(['POST'])
def toggle_favorite(request, pk):
    property = Property.objects.get(pk=pk)  # Get the property instance

    # Check if the property is already favorited by the user
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)  # Remove user from favorites
        return JsonResponse({'is_favorite': False})
    else:
        property.favorited.add(request.user)  # Add user to favorites
        return JsonResponse({'is_favorite': True})








# authentication_classes:
# Purpose: Determines how the view should authenticate incoming requests.
# permission_classes:
# Purpose: Determines whether the authenticated user has permission to perform the action they are trying to execute.