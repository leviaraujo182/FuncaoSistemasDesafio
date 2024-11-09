using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiarios daoBeneficiarios = new DAL.DaoBeneficiarios();
            return daoBeneficiarios.Incluir(beneficiario);
        }

        public void Excuir(long id)
        {
            DAL.DaoBeneficiarios daoBeneficiarios = new DAL.DaoBeneficiarios();
            daoBeneficiarios.Excluir(id);
        }

        public void Atualizar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiarios daoBeneficiarios = new DAL.DaoBeneficiarios();
            daoBeneficiarios.Atualizar(beneficiario);
        }

        public List<DML.Beneficiario> Listar(long id)
        {
            DAL.DaoBeneficiarios daoBeneficiarios = new DAL.DaoBeneficiarios();
            return daoBeneficiarios.Listar(id);
        }

        public bool VerificarBeneficiario(string cpf, long IdCliente)
        {
            DAL.DaoBeneficiarios daoBeneficiarios = new DAL.DaoBeneficiarios();
            return daoBeneficiarios.VerificarBeneficiario(cpf, IdCliente);
        }
    }
}
