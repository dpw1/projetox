from rest_framework import serializers
from .models import CustomUser

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from rest_auth.registration.serializers import RegisterSerializer


class CustomRegisterSerializer(RegisterSerializer):
    '''
    Please update the "adapter.py" with the extra fields added below.
    '''
    nif = serializers.CharField()

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'nif': self.validated_data.get('nif', '')
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'city', 'postal_code', 'nif',
                  'iban', 'birth_date', 'update_date', 'picture', 'phone_number',)
