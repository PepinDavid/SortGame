FROM node:18-alpine

WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

EXPOSE 5000

# Démarrage du serveur Express
CMD ["npm", "run", "dev"]
