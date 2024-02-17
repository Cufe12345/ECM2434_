- run : pip install Django

- run : pip install djangorestframework django-cors-headers

( For HTTPS 🔒:
- run : pip install pyOpenSSL
  
- run : pip install django-extensions Werkzeug
)
  
- Locate and go to /Backend/ at the same level as manage.py

- run : python manage.py runserver

( HTTPS 🔒:
- python manage.py runserver_plus --cert-file cert.pem --key-file key.pem )
