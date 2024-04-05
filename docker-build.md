docker build -f Microservices.Ecommerce/Microservices.Ecommerce.WebApp/Dockerfile -t webapp.ecommerce:v.0.1 .
docker run -p 9091:9091 -n webapp webapp.ecommerce:v.0.1