$(document).ready(function (e) {
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();
        const postUrl = $(this).data('urlpost');
        $.ajax({
            url: postUrl,
            method: "POST",
            data: {
                "NOME": $(this).find("#nomeBeneficiario").val(),
                "CPF": $(this).find("#cpfBeneficiario").val(),
                "IDCLIENTE": $(this).find("#IDCLIENTE").val()
            },
            error: function (r) {
                console.log("BATEU AQUI")
                if (r.status === 400) {
                    // Captura a mensagem de erro do JSON retornado
                    const errorMessage = r.responseJSON.mensagem || "Ocorreu um erro";
                    ModalDialog("Ocorreu um erro", errorMessage);
                } else if (r.status === 500) {
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor");
                }
            },
            success: function (r) {
                ModalDialog("Sucesso!", r.mensagem); // Exibe a mensagem de sucesso
                $('#modalBeneficiarios').modal('hide');
                $('#formCadastroBeneficiario')[0].reset();
            }
        });
    });
});



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