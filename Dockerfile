FROM nginx:1.13.9-alpine
LABEL AUTHOR="Dominic Motuka <dominic.motuka@andela.com>"
LABEL AUTHOR="Valentine Mayaki <valentine.mayaki@andela.com>"
LABEL app="esa-frontend"

COPY /usr/src/app/build /usr/share/nginx/html
COPY /usr/src/app/docker-config/vhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
