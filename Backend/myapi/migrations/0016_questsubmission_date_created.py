# Generated by Django 4.2.9 on 2024-03-11 12:49

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0015_questsubmission_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='questsubmission',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
