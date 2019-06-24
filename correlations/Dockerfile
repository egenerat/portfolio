FROM python:3.7

ADD server.py funds_correlations.py requirements-api.txt requirements-correlations.txt /app/
WORKDIR app
RUN pip install -r requirements-api.txt -r requirements-correlations.txt

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]
