//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;

//velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;
let raio = diametro / 2;

//Variáveis para borda da bolinha
let esquerdaBolinha = xBolinha - raio;
let superiorBolinha = yBolinha - raio;
let inferiorBolinha = yBolinha + raio;

//Variáveis da Raquete esquerda
let xRaqueteEsquerda = 5;
let yRaqueteEsquerda = 130;

//Variável raquete direita
let xRaqueteDireita = 585;
let yRaqueteDireita = 130;
let VelocidadeYDireita;

//variável raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variável esfera 
let direitaRaquete = xRaqueteEsquerda + raqueteComprimento;
let superiorRaquete = yRaqueteEsquerda;
let inferiorRaquete = yRaqueteEsquerda + raqueteAltura;

let colidiu = false;

//Placar
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload () {
  trilha = loadSound ("trilha2.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background (255,203,219);
  mostraBolinha ();
  movimentaBolinha ();
  verificaBorda ();
  mostraRaqueteDireita ();
  mostraRaqueteEsquerda ();
  movimentaRaqueteEsquerda ();
  //movimentaRaqueteDireita ();
  movimentaRaqueteMultiplayer ();
  //verificaColisao ();
  colisaoRaqueteBiblioteca(xRaqueteDireita, yRaqueteDireita);
  colisaoRaqueteBiblioteca(xRaqueteEsquerda, yRaqueteEsquerda);
  incluiPlacar ();
  marcaPonto ();
  bolinhaNaoFicaPresa ();
}

function mostraBolinha (){
  fill (color(255, 0, 217));
  circle(xBolinha,yBolinha, diametro);
  noStroke();
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; 
}

function verificaBorda (){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaqueteEsquerda () {
  rect(xRaqueteEsquerda,yRaqueteEsquerda,raqueteComprimento,raqueteAltura, 20);
}

function mostraRaqueteDireita () {
  rect(xRaqueteDireita,yRaqueteDireita,raqueteComprimento,raqueteAltura, 20);
}

function movimentaRaqueteEsquerda (){
  if (keyIsDown(87)) {
    yRaqueteEsquerda -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteEsquerda += 10;
  }
  yRaqueteEsquerda = constrain(yRaqueteEsquerda, 0, 310);
}

function movimentaRaqueteMultiplayer (){
  if (keyIsDown (UP_ARROW)) {
    yRaqueteDireita -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteDireita += 10;
  }
  yRaqueteDireita = constrain(yRaqueteDireita, 0, 310);
}

function movimentaRaqueteDireita () {
  velocidadeYDireita = yBolinha - yRaqueteDireita - raqueteComprimento / 2 - 30;
  yRaqueteDireita += velocidadeYDireita;
  calculaChanceDeErrar ();
  yRaqueteDireita = constrain(yRaqueteDireita, 0, 310);
}

function verificaColisao (){
  if (esquerdaBolinha < direitaRaquete && superiorBolinha < inferiorRaquete && inferiorBolinha > superiorRaquete){
    velocidadeXBolinha *= -1;
  }
  raquetada.play ();
}

function colisaoRaqueteBiblioteca (x, y){
   colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play ();
  }
}

function incluiPlacar() {
  stroke (255);
  textAlign (CENTER);
  textSize (20);
  fill (color(255, 0, 217));
  rect (150, 10, 40, 20, 20);
  fill(color(255,0,217));
  rect (450, 10, 40, 20, 20);
  fill (color (255));
  text(meusPontos, 170, 27);
  fill (color(255));
  text(pontosDoOponente, 470, 27);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play ();
  }
  if(xBolinha <10) {
    pontosDoOponente +=1;
    ponto.play ();
    
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 100
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}