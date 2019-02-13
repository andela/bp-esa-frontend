FROM node:alpine as builder

LABEL AUTHOR="Dominic Motuka <dominic.motuka@andela.com>"
LABEL AUTHOR="Valentine Mayaki <valentine.mayaki@andela.com>"
LABEL app="esa-frontend"

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json /usr/src/app/


RUN npm install --silent
COPY . /usr/src/app


ENV NODE_ENV=production 
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker-config/vhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
