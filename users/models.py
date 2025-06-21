from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, whatsapp_number, password=None, **extra_fields):
        if not whatsapp_number:
            raise ValueError('O número de WhatsApp deve ser informado')
        whatsapp_number = self.normalize_email(whatsapp_number)
        user = self.model(whatsapp_number=whatsapp_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, whatsapp_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser deve ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser deve ter is_superuser=True.')
        return self.create_user(whatsapp_number, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    country_code = models.CharField(max_length=5)
    whatsapp_number = models.CharField(max_length=15, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'whatsapp_number'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'country_code']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.whatsapp_number})"

class Wallet(models.Model):
    def generate_neura_id():
        return "neura_" + str(uuid.uuid4())

    id = models.CharField(primary_key=True, max_length=40, default=generate_neura_id, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='wallets')
    name = models.CharField(max_length=100)
    TYPE_CHOICES = [
        ('Mpesa', 'Mpesa'),
        ('E-Mola', 'E-Mola'),
    ]
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    STATUS_CHOICES = [
        ('Ativa', 'Ativa'),
        ('Em verificação', 'Em verificação'),
        ('Pausada', 'Pausada'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Ativa')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.type})"
