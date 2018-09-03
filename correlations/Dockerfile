FROM python:3.7-alpine

ADD server.py requirements.txt /app/
WORKDIR app
RUN pip install -r requirements.txt

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]
