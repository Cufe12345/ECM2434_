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

  ## NOTE ##
  
  If you run the HTTP and HTTPS servers concurently you need to change the port of one the servers.
  You can do it like this : "python .\manage.py runserver 8001" to change the port of the HTTP server

  ADMIN :
    USERNAME : ecm2434
    PASSWORD : Al8Or!thm
