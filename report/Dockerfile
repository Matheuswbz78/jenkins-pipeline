FROM node:23-slim
WORKDIR /app
COPY . .
RUN npm install express mysql2
EXPOSE 4040
CMD ["node", "server.js"]