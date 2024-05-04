docker build -f Microservices.Ecommerce/Microservices.Ecommerce.WebApp/Dockerfile -t webapp.ecommerce:v.0.1 .
docker build -f Microservices.Ecommerce/Microservices.Ecommerce.WebViteApp.Server/Dockerfile -t webviteapp.ecommerce:v.0.1 .
docker run -p 9091:9091 -n webapp webapp.ecommerce:v.0.1

netstat -ano | findStr "5173"
taskkill /F /PID 13164
