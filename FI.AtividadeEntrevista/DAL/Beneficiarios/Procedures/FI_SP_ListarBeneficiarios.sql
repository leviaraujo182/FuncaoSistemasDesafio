CREATE PROCEDURE [dbo].[FI_SP_ListarBeneficiarios]
    @IDCLIENTE BIGINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ID,
        CPF,
        NOME,
        IDCLIENTE
    FROM 
        [dbo].[BENEFICIARIOS]
    WHERE 
        (@IDCLIENTE IS NULL OR IDCLIENTE = @IDCLIENTE);
END;
