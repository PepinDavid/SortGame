# Utilisation de l'image officielle de Node.js
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construction du projet
RUN npm run build

# Exposer le port pour servir le frontend
EXPOSE 3000

# Démarrage du serveur de développement
CMD ["npm", "start"]
