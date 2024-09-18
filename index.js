const express = require('express');
const path = require('path');
const router = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router)

app.listen(PORT, ()=> console.log(`Server Ready At Port = ${PORT}`));