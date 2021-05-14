FROM ubuntu:20.10
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt

EXPOSE 80
ENTRYPOINT ["python"]
CMD ["akuso.py"]


