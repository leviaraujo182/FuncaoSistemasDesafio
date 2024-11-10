$(document).ready(function () {
    $('#modalBeneficiarios').on('shown.bs.modal', function () {
        const idCliente = $('#IDCLIENTE').val();
        carregarBeneficiarios(idCliente);
    });

    $('#incluirBtn').on('click', function () {
        const postUrl = $('#formCadastroBeneficiario').data('urlpost');
        $.ajax({
            url: postUrl,
            method: "POST",
            data: {
                "NOME": $('#nomeBeneficiario').val(),
                "CPF": $('#cpfBeneficiario').val(),
                "IDCLIENTE": $('#IDCLIENTE').val()
            },
            success: function () {
                ModalDialog("Sucesso!", "Beneficiario cadastrado com sucesso!")
                $('#formCadastroBeneficiario')[0].reset();
                carregarBeneficiarios($('#IDCLIENTE').val());
            },
            error: function (e) {
                ModalDialog("Ocorreu um erro", r.responseJSON.mensagem || r.responseJSON)
            }
        });
    });

    $('#cancelarBtn').on('click', function () {
        $('#formCadastroBeneficiario')[0].reset();
        toggleButtons(false);
    });

    $('#salvarBtn').on('click', function () {
        const idBeneficiario = $('#IDBENEFICIARIO').val();
        const idCliente = $('#IDCLIENTE').val()
        const cpf = $('#cpfBeneficiario').val();
        const nome = $('#nomeBeneficiario').val();

        $.ajax({
            url: `/Beneficiario/Atualizar`,
            method: 'POST',
            data: {
                Id: idBeneficiario,
                IdCliente: idCliente,
                CPF: cpf,
                Nome: nome,
            },
            success: function () {
                ModalDialog("Sucesso!", "Beneficiario atualizado com sucesso!");
                $('#formCadastroBeneficiario')[0].reset();
                toggleButtons(false);
                carregarBeneficiarios($('#IDCLIENTE').val());
            },
            error: function (r) {
                console.log(r)
                ModalDialog("Ocorreu um erro", r.responseJSON.mensagem || r.responseJSON);
            }
        });
    });
});

function toggleButtons(isEditing) {
    $('#incluirBtn').toggle(!isEditing);
    $('#salvarBtn, #cancelarBtn').toggle(isEditing);
}

function editarBeneficiario(element) {
    const id = $(element).data('id');
    const cpf = $(element).data('cpf');
    const nome = $(element).data('nome');

    $('#IDBENEFICIARIO').val(id);
    $('#cpfBeneficiario').val(formatarCPF(cpf));
    $('#nomeBeneficiario').val(nome);
    toggleButtons(true);
}

function carregarBeneficiarios(idCliente) {
    $.ajax({
        url: '/Beneficiario/Listar',
        method: 'GET',
        data: { idCliente: idCliente },
        success: function (data) {
            let tabela = $('#tabelaBeneficiarios tbody');
            tabela.empty();

            data.forEach(function (beneficiario) {
                const row = `
                        <tr>
                            <td class="text-center">${formatarCPF(beneficiario.CPF)}</td>
                            <td class="text-center">${beneficiario.Nome}</td>
                            <td class="text-center">
                                <button class="btn btn-primary btn-sm"
                                        onclick="editarBeneficiario(this)"
                                        data-id="${beneficiario.Id}" 
                                        data-cpf="${beneficiario.CPF}" 
                                        data-nome="${beneficiario.Nome}"
                                        data-IdCliente="${beneficiario.IdCliente}">
                                    Alterar
                                </button>
                                <button class="btn btn-primary btn-sm" onclick="deletarBeneficiario(${beneficiario.Id})">Excluir</button>
                            </td>
                        </tr>`;
                tabela.append(row);
            });
        },
        error: function () {
            ModalDialog("Ocorreu um erro", "Não foi possível carregar a lista de beneficiarios");
        }
    });
}


function deletarBeneficiario(id) {
    if (confirm("Deseja realmente excluir este beneficiario?")) {
        $.ajax({
            url: `/Beneficiario/Excluir/${id}`,
            method: 'POST',
            success: function () {
                ModalDialog("Sucesso!", "Beneficiario removido com sucesso!");

                const idCliente = $('#IDCLIENTE').val();
                carregarBeneficiarios(idCliente);
            },
            error: function () {
                ModalDialog("Ocorreu um erro", r.responseJSON.mensagem || r.responseJSON);
            }
        });
    }
}

function formatarCPF(cpf) {
    cpf = cpf.toString().replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var modalHtml = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(modalHtml);
    $('#' + random).modal('show');
}