const path = require('path')
const bcrypt = require('bcrypt')
const fs = require('fs')
const UsuariosController = {
    showEntrar: (req,res)=>{
        let erroNoCadastro = (req.query.erroNoCadastro == 1);

        res.render('entrar.ejs', {erroNoCadastro})
    },
    
    add: (req, res) => {
        // Verificar se a senha e confirmação estão ok
        
        // Criar um objeto com as informações do usuário
        
        // Salvar o usuário no arquivo usuarios.json
        
        // Criar uma session com as informações NÃO SENSÍVEIS do usuário
        
        // Redirecionar o usuário...
        // Caso ele tenha carrinho -> /pizzas/cart
        // Caso contrário -> /pizzas
        
        // capturar as info do form
        
        let {email, senha, confirmacao, endereco} = req.body;
        if(senha != confirmacao){
            res.redirect('/usuarios/entrar?erroNoCadastro=1')
        }
        // Salvar as info do form no arquivo usuarios.json
        let usuario = {
            email,
            senha: bcrypt.hashSync(senha, 10),
            enderecos:[endereco]
            
        }
        // vai ter criado um obj: usuario = {email:"teste@teste.com", senha: "lkajshdlask", endereco: "Rua 123"}
        const usuarios = require('../database/usuarios.json')
        
        // Criar a req.session.usuario
        req.session.usuario = usuario
        
        usuarios.push(usuario)
        fs.writeFileSync(
            path.join(__dirname, '../database/usuarios.json'),
            JSON.stringify(usuarios, null, 4)
        )
        // Direcionar o usuario para /pizzas ou /pizzas/cart
        if(req.session.pizzas) {
            res.redirect('/pizzas/cart');
        } else {
            res.redirect('/pizzas');
        }
    }
}
module.exports = UsuariosController;