using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class CPFValidationAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value == null)
            return false;

        // Remove caracteres de pontuação do CPF
        var cpf = Regex.Replace(value.ToString(), @"[^\d]", "");

        if (cpf.Length != 11 || !long.TryParse(cpf, out _))
            return false;

        bool allDigitsEqual = true;
        for (int i = 1; i < 11 && allDigitsEqual; i++)
        {
            if (cpf[i] != cpf[0])
                allDigitsEqual = false;
        }
        if (allDigitsEqual)
            return false;

        int[] multipliers1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        int sum = 0;
        for (int i = 0; i < 9; i++)
            sum += (cpf[i] - '0') * multipliers1[i];

        int remainder = sum % 11;
        int digit1 = remainder < 2 ? 0 : 11 - remainder;

        int[] multipliers2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        sum = 0;
        for (int i = 0; i < 10; i++)
            sum += (cpf[i] - '0') * multipliers2[i];

        remainder = sum % 11;
        int digit2 = remainder < 2 ? 0 : 11 - remainder;

        return cpf[9] - '0' == digit1 && cpf[10] - '0' == digit2;
    }
}
