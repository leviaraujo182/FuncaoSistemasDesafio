CREATE PROCEDURE [dbo].[AtualizarBeneficiario]
    @ID BIGINT,
    @CPF VARCHAR(11),
    @NOME VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[BENEFICIARIOS]
    SET 
        CPF = @CPF,
        NOME = @NOME
    WHERE 
        ID = @ID;
END;
