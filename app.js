// Importando o express
const express = require('express');
const RegistraHoraDeAcesso = require('./middlewares/registraHoraDeAcesso');
const session = require('express-session')

// Criando a aplicação express
const app = express();

// Importando o roteador que lida com as rotas de pizza
const PizzasRouter = require('./routes/PizzasRouter');
const UsuariosRouter = require('./routes/UsuariosRouter');
// verificando se a requisição e para a pasta public
app.use(express.static("public"));
// Processa os formulários do tipo pos e organiza as info no req.body
app.use(express.urlencoded({ extended: false }));


app.use(RegistraHoraDeAcesso)

app.use(
    session({
        secret: 'CHAVE-SECRETA',
        resave: false,
        saveUninitialized: true
        
    })
)

// Fazendo com que a aplicação utilize o roteador para todas as req que chegarem para endereços que comecem com /pizzas
app.use('/pizzas', PizzasRouter);
app.use('/usuarios',UsuariosRouter)

app.set('view engine', 'ejs')
// configuração de coocies

// Adicionando uma rota na aplicação que responde para usuário diretamente... (isso não é MVC, mas funciona)
app.get('/', (req, res) => { res.send("Olá, visitante") })

// Pondo a aplicação para rodar escutando na porta 3000
app.listen(3000, () => { console.log("servidor rodando na porta 3000") });

