#Define image to build from
FROM node:dubnium

LABEL AUTHOR="Dominic Motuka <dominic.motuka@andela.com>"
LABEL app="esa-frontend"

#Create directory to hold the application code inside the image
#Working directory of the application
WORKDIR /usr/src/app

#Install app dependencies using npm binary
# COPY package*.json ./


#Bundle apps source code
COPY . .

RUN npm install
# When building  for production
# RUN npm install --only=production
# Uncomment this when using the application locally
# COPY .env .

ENV PORT=4050
# app binds to port 3000 so you'll use the EXPOSE
# instruction to have it mapped by the docker daemon:
EXPOSE 4050

# define the command to run your app using 
# CMD which defines your runtime


CMD [ "npm", "start" ]

RUN npm rebuild node-sass
