using Patrimonio.Contexts;
using Patrimonio.Domains;
using Patrimonio.Interfaces;
using Patrimonio.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Patrimonio.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

        private readonly PatrimonioContext ctx;

        public UsuarioRepository(PatrimonioContext appContext)
        {
            ctx = appContext;
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                //senha = senha que veio do input
                //usuario.Senha = senha que veio do banco


                //se a senha do banco for igual a senha do input...
                if (usuario.Senha == senha)
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                    //a senha do banco é criptografada pelo hash
                    ctx.SaveChanges();
                }

                // comparar a senha que veio do input e a do banco para conseguir fazer o login.
                bool confere = Criptografia.Comparar(senha, usuario.Senha);

                if (confere)
                    return usuario;
            }


            return null;
        }
    }
}
