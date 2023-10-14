let tentativas = 1;
let numeroFinal = 30;
let numerosSecretos = [];
let numeroSecreto = telaInicial();

// função auxiliar
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

// função auxiliar
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroFinal + 1);
    numerosSecretos = numerosSecretos.length == numeroFinal ? [] : numerosSecretos;  
    if (numerosSecretos.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        numerosSecretos.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// função auxiliar
function limparCampo(campo){
    campo.value = '';
}

// função principal    
function telaInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroFinal}`);
    document.getElementById('reiniciar').setAttribute('disabled',true);
    return gerarNumeroAleatorio();
}

// função principal
function verificarChute() {
    let chute = document.querySelector('input');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

    mensagem = (chute.value == numeroSecreto) ? 'Acertou' : 'Errou';
    exibirTextoNaTela('h1',mensagem);
    
    mensagem = (chute.value == numeroSecreto) ? `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}` :
        (chute.value > numeroSecreto) ? `O número secreto é menor do que ${chute.value}` :
            `O número secreto é maior do que ${chute.value}`;
    exibirTextoNaTela('p',mensagem);
    
    chute.value == numeroSecreto ? document.getElementById('reiniciar').removeAttribute('disabled') : tentativas++;
    limparCampo(chute);
}

// função principal
function reiniciarJogo(){
    tentativas = 1;
    numeroSecreto = telaInicial();
}