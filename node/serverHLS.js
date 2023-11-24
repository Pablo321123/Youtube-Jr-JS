const express = require('express')
const HLSServer = require('hls-server');
const http = require('http')
const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, '../assets/output') //Caminho para os arquivos m3u8 (padrao HLS)
const htmlPath = path.join(__dirname, '../html') //Caminho para a página html que consome o nosso servidor HLS

const port = 8080
const app = express();
app.use(express.static(htmlPath))
app.use(express.static(assetsPath))

const server = http.createServer(app)

// Remova ou comente essas linhas se estiverem presentes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

const hls = new HLSServer(server, {
  path: '/streams', // Acesse o HLS em http://localhost:8080/streams/nome-do-arquivo.m3u8
  dir: assetsPath // Diretório onde os arquivos HLS estão localizados
})

server.listen(port, () => { console.log(`Servidor HLS rodando em http://localhost:${port}`) })