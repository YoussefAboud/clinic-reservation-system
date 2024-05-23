FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install dotenv
RUN npm install react-scripts
RUN npm install react-router-dom@5.2.0
RUN npm install axios
COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["npm","start"]