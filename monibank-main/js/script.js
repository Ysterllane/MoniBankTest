import ehUmCPF from "./valida-cpf.js"
import ehMaiorDeIdade from "./valida-idade.js"

const camposDoForm = document.querySelectorAll('[required]') //atributo de required
const form = document.querySelector('[data-formulario]')

form.addEventListener('submit', (e) => { //submit ao enviar o form

    e.preventDefault() // n da um reload na page

    const listaRespostas = { //.target é o própio elemento form

        'nome': e.target.elements['nome'].value, //.elements é cada elemento e seu valor
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value
    }

    // localStorage: O localStorage é uma API do JavaScript que permite armazenar dados no navegador do usuário. Esses dados ficam salvos mesmo após o usuário fechar e reabrir o navegador.

    // .setItem(): É um método do localStorage que permite armazenar um par de chave-valor. Nesse caso, estamos armazenando os dados do formulário.

    // 'cadastro': Essa é a chave (ou nome) que será usada para identificar os dados armazenados no localStorage. Nesse caso, estamos usando o nome "cadastro" para identificar os dados do formulário.

    // JSON.stringify(listaRespostas): O JSON.stringify() é uma função do JavaScript que converte um objeto JavaScript em uma string no formato JSON. Isso é necessário porque o localStorage só aceita strings como valores.
    
    localStorage.setItem('cadastro', JSON.stringify(listaRespostas)) 
    window.location.href = './abrir-conta-form-2.html'
})

camposDoForm.forEach((campo) => { //para cada campo da nossa nodeList

    campo.addEventListener('blur', () => verificaCampo(campo)) //blur tirar foco do input

    campo.addEventListener
    ('invalid', evento => evento.preventDefault())
})

// o valueMissing ocorre quando deixamos o campo vazio;
// o typeMismatch ocorre quando erramos o tipo de input no campo, como por exemplo, na inserção de um e-mail sem o símbolo @;
// o patternMismatch ocorre especialmente no campo de CPF que possui um padrão de expressão regular. Se o input não segui-lo, este erro será ativado;
// o tooShort está relacionado aos atributos minlength e maxLength que inserimos em diversos pontos do código. Ele serve para acusar quando os padrões de comprimento do input não forem atendidos;
// o customError se refere a erros customizados, como nos casos em que inserimos as lógicas de validação ehUmCPF e ehMaiorDeIdade.

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        patternMismatch: "Por favor, preencha uma data de nascimento válida.",
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){

    let mensagem = ''
    campo.setCustomValidity('')

    // se o nome do campo == cpf e o tamanho de seu valor >= 11
    if (campo.name == 'cpf' && campo.value.length >= 11){
        ehUmCPF(campo)
    }
    if (campo.name == 'aniversario' && campo.value != ''){ //se o nome d campo não tiver vazio e for aniversário
        ehMaiorDeIdade(campo)
    }
    tiposDeErro.forEach(erro => { //para cada erro

        if(campo.validity[erro]){ //se estiver com true é pq deu erro

            mensagem = mensagens[campo.name][erro] //mensagem = respectiva mensagem do respectivo erro da lista de mensagens
            console.log(mensagem)
        }
    })                  //procurando o input prox da '.mensagem-erro'
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')

    const validadorDeInput = campo.checkValidity() //checa a validade do campo
 
    mensagemErro.textContent = ''

    if(!validadorDeInput){ //se tiver inválido
        mensagemErro.textContent = mensagem
    }
}