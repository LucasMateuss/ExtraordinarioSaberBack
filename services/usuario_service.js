import Usuario from "../models/usuario_model.js"

let usuarioService = {}

usuarioService.Todos = async function(){
    try {
        return await Usuario.findAll()
    } catch (e) {
        throw e
    }
}

usuarioService.BuscarUsuario = async function(usuario) {
    try{
            let resultado = 
                Usuario.findOne(
                    { 
                        where: { 
                            email: usuario.email, 
                            senha: usuario.senha 
                        } 
                    })

            return resultado;
    } catch (e) {
        throw e
    }
 
}

export {usuarioService}