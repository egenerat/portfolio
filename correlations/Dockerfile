FROM python:3.7-alpine

ADD server.py funds_correlations.py requirements-api.txt requirements-correlations.txt /app/
WORKDIR app
RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev
RUN pip install -r requirements-api.txt -r requirements-correlations.txt

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]
