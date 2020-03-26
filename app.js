var express = require('express');
var app = express();

PORT = (process.env.PORT||3000)

app.get('/pedidos', require('./js/pedidos.js'));
app.use('/', express.static(__dirname + '/public_html'));

app.listen(PORT, ()=>{
	console.log("Servidor ouvindo na porta ", PORT)
})