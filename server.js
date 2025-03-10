require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Conecta ao banco de dados
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));
    
// Rota de contatos

app.use('/contacts', require('./routes/contacts'));// integração com o arquivo routes/contacts.js

app.get('/', (req, res) => {
    res.send('API de Contatos - CSE341');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



