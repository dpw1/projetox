from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'nif']
    fieldsets = (
        (('User'), {'fields': ('username', 'password', 'email', 'address', 'country', 'nif', 'city',
                               'postal_code',
                               'iban',
                               'birth_date',

                               'picture',
                               'phone_number',)}),
        (('Permissions'), {
         'fields': ('is_active', 'is_staff', 'is_superuser',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
