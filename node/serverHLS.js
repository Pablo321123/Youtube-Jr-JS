const express = require('express')
const HLSServer = require('hls-server');
const http = require('http')
const path = require('path');

const assetsPath = path.join(__dirname, '../assets/output') //Caminho para os arquivos m3u8 (padrao HLS)
const htmlPath = path.join(__dirname, '../html') //Caminho para a página html que consome o nosso servidor HLS
const homePath = path.join(__dirname, '../FrontEnd/index.html') //Caminho para a página html que consome o nosso servidor HLS
const cssPath = path.join(__dirname, '../FrontEnd')

const portServerHls = 8080
const portRoutes = 3003
const app = express();


app.use(express.static(htmlPath))
app.use(express.static(assetsPath))
app.use(express.static(cssPath));

//Permissões para permitir a comunicação entre portas
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/home', (req, res, next) => {
  res.sendFile(homePath)
});

app.get('/videos', (req, res, next) => {
  res.json({ teste: "teste" });
});

const server = http.createServer(app)

const hls = new HLSServer(server, {
  path: '/streams', // Acesse o HLS em http://localhost:8080/streams/nome-do-arquivo.m3u8
  dir: assetsPath // Diretório onde os arquivos HLS estão localizados
})

server.listen(portServerHls, () => { console.log(`Servidor HLS rodando em http://localhost:${portServerHls}`) })
app.listen(portRoutes, () => { console.log(`Rotas de consulta rodando em http://localhost:${portRoutes}/home`) })




