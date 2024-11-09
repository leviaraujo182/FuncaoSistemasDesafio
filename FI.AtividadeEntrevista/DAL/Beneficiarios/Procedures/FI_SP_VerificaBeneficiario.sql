CREATE PROCEDURE [dbo].[FI_SP_VerificarBeneficiario]
    @CPF VARCHAR(11),
    @IDCLIENTE BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ID
    FROM 
        [dbo].[BENEFICIARIOS]
    WHERE 
        CPF = @CPF 
        AND IDCLIENTE = @IDCLIENTE;
END;
