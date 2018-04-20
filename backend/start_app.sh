python manage.py makemigrations api
python manage.py migrate
gunicorn worldcup.wsgi:application -w 3 -b 0.0.0.0:8080