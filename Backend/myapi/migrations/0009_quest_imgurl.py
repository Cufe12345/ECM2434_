# Generated by Django 4.2.9 on 2024-02-29 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0008_userprofile_streak_alter_userprofile_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='quest',
            name='imgURL',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='myapi.image'),
            preserve_default=False,
        ),
    ]
