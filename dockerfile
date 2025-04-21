FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências do sistema necessárias para compilar sqlite3
RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    && npm install -g pm2

# Instala as dependências do projeto dentro do container
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Exponha a porta usada pela aplicação
EXPOSE 3333

# Roda o app com PM2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]