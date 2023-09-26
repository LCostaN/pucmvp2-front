# estágio de compilação
FROM node:lts-alpine as build-stage
ENV VITE_USER_API_URL=http://localhost:5000/
ENV VITE_LIST_API_URL=http://localhost:5001/list/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]