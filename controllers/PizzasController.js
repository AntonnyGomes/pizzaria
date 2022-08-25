// Importando o array de pizzas
const pizzas = require('../database/pizzas.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {
        res.render('index.ejs', {pizzas});
    },
    show:(req,res) =>{
        //LEvantar o id digitado 
        let id = req.params.id;
        // Encontrar no array de pizzas a pizza procurada
        let pizza = pizzas.find(p => p.id == id)
        res.render('pizza.ejs',{ pizza })
    },
    search:(req,res) =>{
        
    }

}