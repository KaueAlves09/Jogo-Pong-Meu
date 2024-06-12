// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

// variáveis do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// variáeis das paredes

let paredeComprimento = 8;
let paredeAltura = 80;
let xParede = [220, 380, 220, 380];
let yParede = [95, 225, 95, 225];
let velocidadeYParede = 3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);

  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponete();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  placar();
  marcaPontos();
  mostraParedes();
  colisaoParedeBiblioteca();
  movimentaParede();
  inverteDirecaoParede();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 7;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 7;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponete() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 7;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 7;
  }
}

function placar() {
  textAlign(CENTER);
  textSize(16);
  stroke("white");
  fill("orange");
  rect(230, 10, 40, 20);
  fill("white");
  text(meusPontos, 250, 26);
  fill("orange");
  rect(330, 10, 40, 20);
  fill("white");
  text(pontosOponente, 350, 26);
}

function marcaPontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
  }
}

function mostraParedes() {
  rect(xParede[0], yParede[0], paredeComprimento, paredeAltura);
  rect(xParede[2], yParede[1], paredeComprimento, paredeAltura);
  rect(xParede[1], yParede[2], paredeComprimento, paredeAltura);
  rect(xParede[3], yParede[3], paredeComprimento, paredeAltura);
}

function colisaoParedeBiblioteca() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      colidiu = collideRectCircle(xParede[i], yParede[j], paredeComprimento, paredeAltura, xBolinha, yBolinha, raio);
      if (colidiu) {
        velocidadeXBolinha *= -1;
      }
    }
  }
}

function movimentaParede (){
  
//Paredes da Esquerda 
   yParede[0] += velocidadeYParede;
   yParede[1] += velocidadeYParede;
  
//Paredes da Direita
   yParede[2] -= velocidadeYParede;
   yParede[3] -= velocidadeYParede;
}

function inverteDirecaoParede(){
 if(yParede[1] > 310 || yParede[0] < 10){
   velocidadeYParede *= -1
 }
}