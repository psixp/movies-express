const express = require('express');
const path = require('path');
const {Sequelize} = require('sequelize');

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);

const sequelize = new Sequelize('movies_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Servidor conectado com sucesso.');
    } catch (error) {
        console.error('Não foi possivel conectar por:', error);
    }
}
authenticate()


app.listen('3001', () => console.log('Servidor rodando na porta 3001'));
