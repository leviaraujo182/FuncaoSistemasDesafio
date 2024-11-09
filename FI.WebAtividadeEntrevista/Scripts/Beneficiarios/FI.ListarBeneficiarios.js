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
                alert("Beneficiario incluido com sucesso!");
                $('#formCadastroBeneficiario')[0].reset();
                carregarBeneficiarios($('#IDCLIENTE').val());
            },
            error: function (e) {
                alert(e.responseJSON.mensagem);
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

        console.log("BENEFICIARIO:", idBeneficiario)

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
                alert("Beneficiário atualizado com sucesso!");
                $('#formCadastroBeneficiario')[0].reset();
                toggleButtons(false);
                carregarBeneficiarios($('#IDCLIENTE').val());
            },
            error: function () {
                alert("Erro ao atualizar beneficiário.");
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
    console.log("ID:", id)
    $('#IDBENEFICIARIO').val(id);
    $('#cpfBeneficiario').val(cpf);
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
                console.log("BENEFICIARIO:", beneficiario)
                const row = `
                    <tr>
                        <td>${beneficiario.CPF}</td>
                        <td>${beneficiario.Nome}</td>
                        <td>
                        <button class="btn btn-primary btn-sm"
                                onclick="editarBeneficiario(this)"
                                data-id="${beneficiario.Id}" 
                                data-cpf="${beneficiario.CPF}" 
                                data-nome="${beneficiario.Nome}"
                                data-IdCliente="${beneficiario.IdCliente}">
                            Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deletarBeneficiario(${beneficiario.Id})">Excluir</button>
                        </td>
                    </tr>`;
                tabela.append(row);
            });
        },
        error: function () {
            alert("Não foi possível carregar os beneficiários.");
        }
    });
}