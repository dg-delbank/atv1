FROM node:16
WORKDIR /app
COPY . .
RUN npm install express
EXPOSE 3000
CMD ["node", "app/app.js"]