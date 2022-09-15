// Importando o array de pizzas
const pizzas = require('../database/pizzas.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {
        let quantidade = 0
        if(req.session.pizzas){
            quantidade = req.session.pizzas.length
        }
        res.render('index.ejs', {pizzas, quantidade});
    },
    show:(req,res) =>{
        //LEvantar o id digitado 
        let id = req.params.id;
        // Encontrar no array de pizzas a pizza procurada
        let pizza = pizzas.find(p => p.id == id)
        res.render('pizza.ejs',{ pizza })
    },
    search:(req,res) =>{
        let quantidade = 0
        if(req.session.pizzas){
            quantidade = req.session.pizzas.length
        }
        let termoBuscado = req.query.q 
        const pizzasFiltadas = pizzas.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()))
        res.render('index.ejs',{pizzas:pizzasFiltadas, quantidade})
    }, 
    addCart: (req, res)=>{
        //res.send('vamos adicionar uma pizza ao carrinho'+ req.body.aEscolhida)
        if(req.session.pizzas){
            req.session.pizzas.push(req.body.aEscolhida)
        }else{
            req.session.pizzas = [req.body.aEscolhida]
        }
        res.redirect('/pizzas');
        console.log(req.session)


    },
    showCart: (req, res) => {

        // Levantar do array de pizzas as pizzas que estão na session;
        // ["1" , "3"] ======> [{id:1, nome:"Pepperoni", preco:50}, {id:3, nome:"Fracatu", preco: 32}]
        let idsNoCarrinho = req.session.pizzas;
        
        let getPizzaById = (id) => {
            return pizzas.find(p => p.id == id)
        }

        let pizzasNoCarrinho = idsNoCarrinho.map(getPizzaById);
        // Levantar se o usuário está logado
        let usuarioLogado = (req.session.usuario !== undefined);

        //res.send(pizzasNoCarrinho);

        // Renderizar pizzas.ejs, passando as pizzas que estão no carrinho, e não os ids;
        res.render("cart.ejs", {pizzasNoCarrinho, usuarioLogado});
    }

}