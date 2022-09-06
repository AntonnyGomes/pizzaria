const { json } = require('express');

function PontuaPizza(req, res, next){
    
    // Capturar o id da pizza requerida
    let id = req.params.id

    // Levantar a pontuação da pizza requerida de um arquivo
        // - Importar as pizzas
        const pizzas = require('../database/pizzas.json')
        // - Localizar a pizza de id
        let pizza = pizzas.find(p => p.id == id)
        if (!pizza){
            res.send("pizza nao encontrada")
        }
        // - Pegar a pontuação dela e aumentar a pontuação
        if(pizza.score == undefined){
            pizza.score = 1;
        }else {
            pizza.score++
        }

    // Salvar a nova pontuação no arquivo
        const fs = require('fs');
        const path = require('path');
        let caminhoDoArquivo = path.resolve('./database/pizzas.json')
        let stringJson = JSON.stringify(pizzas, null, 4)
        fs.writeFileSync(caminhoDoArquivo, stringJson)

    // Passar a bola para o próximo middleware
        next();
}

module.exports = PontuaPizza;
