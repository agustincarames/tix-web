FROM node:carbon-alpine

# Install app dependencies
RUN apk add bash
WORKDIR /usr/src/app
COPY package.json .
RUN npm install

# Build app
COPY . .
#RUN npm run compile

# Bundle compiled app into target image
#FROM nginx:1.15.5-alpine
#COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000 

CMD ["./run.sh"]
