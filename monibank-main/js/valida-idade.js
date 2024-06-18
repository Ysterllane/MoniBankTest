export default function ehMaiorDeIdade(campo){
    const dataNascimento = new Date(campo.value) //recebe o valor de data de nascimento para o js entender

    if(!validaIdade(dataNascimento)){
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

function validaIdade(data){
    const dataAtual = new Date() //data q estamos

    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), 
        data.getUTCDate())//add 18 ao ano da data de nasc da pss pra saber qnd ela faz 18

    return dataAtual >= dataMais18
}