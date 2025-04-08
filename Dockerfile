FROM node:20.11.1-alpine3.19

LABEL maintainer="Your Name <your.email@example.com>"
LABEL version="1.0.0"
LABEL description="Gestion de Vente Application"

WORKDIR /usr/src/app

# Create backups directory and set permissions
RUN mkdir -p backups && chown -R node:node .

USER node

# Add npm configuration for better network reliability
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retry-mintimeout 100000 \
    && npm config set fetch-retries 5

# Copy package files
COPY package*.json ./

# Install dependencies with fallback
RUN npm install --production --no-package-lock || \
    (npm cache clean --force && npm install --production --no-package-lock)

# Copy application files
COPY --chown=node:node . .

# Create volume mount point
VOLUME ["/usr/src/app/backups"]

EXPOSE 3000

CMD ["npm", "run", "dev"]
