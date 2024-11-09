using System.Collections.Generic;
using System.Linq;
using System;
using System.Web.Mvc;
using FI.AtividadeEntrevista.BLL;
using FI.WebAtividadeEntrevista.Models;
using FI.AtividadeEntrevista.DML;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AdicionarBeneficiario(BeneficiarioModel model)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(new { mensagem = string.Join(Environment.NewLine, erros) });
            }
            else
            {
                var existeBeneficiario = boBeneficiario.VerificarBeneficiario(model.CPF, model.IdCliente);

                if (existeBeneficiario)
                {
                    Response.StatusCode = 400;
                    return Json(new { mensagem = "Já existe um beneficiário cadastrado com este CPF para este cliente" });
                }

                model.Id = boBeneficiario.Incluir(new Beneficiario
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    IdCliente = model.IdCliente
                });

                return Json(new { mensagem = "Beneficiário cadastrado com sucesso!" });
            }
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();
            boBeneficiario.Excuir(id);

            return Json(new { message = "Beneficiário removido com sucesso!" });
        }

        [HttpGet]
        public JsonResult Listar(long IdCliente)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            List<Beneficiario> beneficiarios = boBeneficiario.Listar(IdCliente);

            return Json(beneficiarios, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Atualizar(BeneficiarioModel model)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                boBeneficiario.Atualizar(new Beneficiario
                {
                    Id = model.Id,
                    CPF = model.CPF,
                    Nome = model.Nome,
                });

                return Json("Beneficiario atualizado com sucesso!");
            }
        }
    }
}