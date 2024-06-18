const botaoIniciarCameta = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')
const botaoTirarFoto = document.querySelector('[data-tirar-foto]')
const canvas = document.querySelector('[data-video-canvas]')
const mensagemDeEnvioDaFoto = document.querySelector('[data-mensagem]')
const botaoEnviarFoto = document.querySelector('[data-enviar]')

let imagemURL = ''

botaoIniciarCameta.addEventListener('click', async function (){

    //navigator.mediaDevices pede ao navegador pra iniciar a câmera
    //.getUserMedia({video: true, audio: false}) solicitando o video e n o audio
    //await espera o usuário aceitar o acesso à câmera
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

    botaoIniciarCameta.Style.display = 'none' //ao iniciar a câmera ele desaparece da tela

    campoCamera.style.display = 'block' //para a camera aparecer na tela

    video.srcObject = iniciarVideo //retorma o objeto iniciar vídeo para a tag video do html

})

botaoTirarFoto.addEventListener('click', function (){
    
 // Essa linha pega o contexto 2D do elemento canvas e usa o método drawImage() para desenhar a imagem da câmera (video) dentro do canvas.
 // Os parâmetros 0, 0 indicam que a imagem será desenhada a partir da posição (0, 0) do canvas.
 // canvas.width e canvas.height definem o tamanho da imagem a ser desenhada, preenchendo todo o espaço do canvas.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    
 // converte a imagem desenhada no canvas em uma URL de imagem no formato JPEG.
    imagemURL = canvas.toDataURL('image/jpeg') 

    campoCamera.style.display = 'none' //oculta o elemento da câmera, pois a foto já foi tirada.

 // exibe o elemento que contém a mensagem de confirmação da captura da foto.  
    mensagemDeEnvioDaFoto.style.display = 'block' 
})

botaoEnviarFoto.addEventListener('click', ()=>{
    const receberDadosExistentes = localStorage.getItem('cadastro') //retorno o objeto item da chave cadastro
    const converteRetorno = JSON.parse(receberDadosExistentes)

    converteRetorno.imagem = imagemURL //criou o atributo imagem do tipo imagemURL

    localStorage.setItem('cadrastro', JSON.stringify(converteRetorno)) //add n cadastro a imagem transformada em json
    window.location.href = './abrir-conta-form-3.html'
})
