var engine = {
    "cores": ['verde','roxo','rosa','vermelho','amarelo','laranja','cinza','preto','marrom','branco'],
    "hexadecimais":{
      'verde':'#02EF00',
      'roxo':'#790093',
      'rosa': '#F02A7E',
      'vermelho':'#E90808',
      'amarelo':'#E7D703',
      'laranja':'#F16529',
      'cinza':'#696969',
      'preto':'#141414',
      'marrom': '#8B4513',
      'branco': '#FFFFFF'
    },
    "moedas":0
}

const audioMoeda = new Audio('assets/audio/moeda.mp3');
const audioErrou = new Audio('/assets/audio/errou.mp3');

function sortearCor(){
  var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
  var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
  var nomeCorSorteada = engine.cores[indexCorSorteada];

  legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

  return engine.hexadecimais[nomeCorSorteada];
}


function aplicarCorNaCaixa(nomeDaCor){
  var caixaDasCores = document.getElementById('cor-atual');
  
  caixaDasCores.style.backgroundColor = nomeDaCor;
  caixaDasCores.style.backgroundImage = "url('/assets/img/caixa-fechada.png')";
  caixaDasCores.style.backgroundSize = "100%";

}


function atualizaPontuacao(valor){
  var pontuacao = document.getElementById('pontuacao-atual');

  engine.moedas += valor;

  if(valor < 0){
    audioErrou.play();
  }else{
    audioMoeda.play();
  }

  pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())
//API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "pt-BR";


  gravador.onstart = function(){
    btnGravador.innerText = "Estou Ouvindo";
    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
  }

  gravador.onend = function(){
    btnGravador.innerText = "Responder";
    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
  }

  gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

    if(transcricaoAudio ===  respostaCorreta){
      atualizaPontuacao(1);
    }else{
      atualizaPontuacao(-1);
    }

    aplicarCorNaCaixa(sortearCor());

  }


}else{
  alert('este navegador não tem suporte, por favor tente utilizar outro');
}


btnGravador.addEventListener('click', function(e){
  gravador.start();
})




