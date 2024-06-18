//função será exportada como padrão: export default
export default function ehUmCPF (campo){

    //replace: dois parâmetros
    //1° oq devemos substituir
    //2° peloq devemos substituir
    // . (ponto) e - (hífen) deve ser substituído por "" (nd)
    const cpf = campo.value.replace(/\.|-/g, "")
    if (validaNumRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido')
    }
}

//verifica se o cpf tem números repetidos (algo inválido para um cpf)
function validaNumRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf) //includes percorrer a lista e retornar true or false
}

function validaPrimeiroDigito(cpf){
    let soma = 0
    let multiplicador = 10

    for(let tamanho = 0; tamanho<9; tamanho++){ //tamanho<9 para os primeiro 9 dígitos do cpf

        soma += cpf[tamanho] * multiplicador // soma vai receber o n° do cpf 9 vezes e multiplicar por de 10 a 2
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[9]
}

function validaSegundoDigito(cpf){
    let soma = 0
    let multiplicador = 11

    for(let tamanho = 0; tamanho<10; tamanho++){ //tamanho<9 para os primeiro 9 dígitos do cpf

        soma += cpf[tamanho] * multiplicador // soma vai receber o n° do cpf 9 vezes e multiplicar por de 10 a 2
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[10]
}