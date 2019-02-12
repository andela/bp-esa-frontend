#Define image to build from
FROM node:alpine as builder

LABEL AUTHOR="Dominic Motuka <dominic.motuka@andela.com>"
LABEL AUTHOR="Valentine Mayaki <valentine.mayaki@andela.com>"
LABEL app="esa-frontend"

#Create directory to hold the application code inside the image
#Working directory of the application
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
#Install app dependencies using npm binary
COPY package*.json /usr/src/app/
# COPY docs /usr/src/app/docs/
# COPY server /usr/src/app/server/
# COPY .sequelizerc /usr/src/app/
# COPY .babelrc /usr/src/app/

RUN npm install --silent
COPY . /usr/src/app

# Uncomment this when using the application locally
# COPY .env .

#Bundle apps source code
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker-config/vhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
