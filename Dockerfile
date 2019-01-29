#Define image to build from
FROM node:dubnium

LABEL AUTHOR="Dominic Motuka <dominic.motuka@andela.com>"
LABEL app="esa-frontend"

#Create directory to hold the application code inside the image
#Working directory of the application
WORKDIR /usr/src/app

#Install app dependencies using npm binary
COPY package*.json /usr/src/app/

#Bundle apps source code
COPY src        /usr/src/app/src/
COPY scripts    /usr/src/app/scripts/
COPY config     /usr/src/app/config/
COPY public     /usr/src/app/public/
COPY public     /usr/src/app/
# COPY .env       /usr/src/app/
COPY .eslintrc.json     /usr/src/app/

RUN npm install
# When building  
RUN npm install 


ENV PORT=4020
# app binds to port 3000 so you'll use the EXPOSE
# instruction to have it mapped by the docker daemon:
EXPOSE 4020

# define the command to run your app using 
# CMD which defines your runtime


CMD [ "npm", "start" ]

RUN npm rebuild node-sass
