# Generated by Django 5.2.3 on 2025-06-20 14:17

import django.db.models.deletion
import users.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('id', models.CharField(default=users.models.Wallet.generate_neura_id, editable=False, max_length=40, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('Mpesa', 'Mpesa'), ('E-Mola', 'E-Mola')], max_length=10)),
                ('balance', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('status', models.CharField(choices=[('Ativa', 'Ativa'), ('Em verificação', 'Em verificação'), ('Pausada', 'Pausada')], default='Ativa', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wallets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
