from django.contrib import admin

# Register your models here.
from .models import UserProduct


class UserProductAdmin(admin.ModelAdmin):
    list_display = ('get_user_id', 'get_user_username', )

    def get_user_username(self, obj):
        return obj.user.username

    def get_user_id(self, obj):
        return obj.user.id

    get_user_username.short_description = "Username"
    get_user_id.short_description = "ID"


admin.site.register(UserProduct, UserProductAdmin)
