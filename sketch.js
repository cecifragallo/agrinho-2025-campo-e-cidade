function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let character;
let isCity = false;
let items = [];
let itemSize = 30;

function setup() {
  createCanvas(800, 600);
  character = new Character();
  
  // Gerando itens no início
  for (let i = 0; i < 5; i++) {
    items.push(new Item());
  }
}

function draw() {
  // Fundo
  if (isCity) {
    drawCity();
  } else {
    drawField();
  }

  // Atualiza o personagem e itens
  character.update();
  character.display();

  // Desenha os itens
  for (let i = items.length - 1; i >= 0; i--) {
    items[i].display();
    if (character.collidesWith(items[i])) {
      items.splice(i, 1); // Remove o item ao ser coletado
    }
  }

  // Transição suave de cidade para campo e vice-versa
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);
  text("Pressione T para mudar entre campo e cidade", width / 2, 20);
}

function drawField() {
  // Fundo campo
  background(34, 139, 34); // Verde campo
  fill(135, 206, 235); // Céu azul
  noStroke();
  rect(0, 0, width, height);

  // Sol
  fill(255, 223, 0);
  ellipse(100, 100, 80, 80);

  // Montanhas
  fill(139, 69, 19); // Cor das montanhas
  triangle(0, height - 50, 150, height - 200, 300, height - 50);
  triangle(200, height - 50, 400, height - 250, 600, height - 50);
}

function drawCity() {
  // Fundo cidade
  background(200); // Fundo cinza claro
  fill(150);
  rect(0, height - 200, width, 200); // Rua

  // Prédios
  for (let i = 0; i < 5; i++) {
    let x = i * 160 + 100;
    let w = 100;
    let h = random(150, 300);
    fill(random(100, 150), random(100, 200), random(150, 255));
    rect(x, height - 200 - h, w, h);
  }

  // Carros na rua
  fill(255, 0, 0);
  rect(150, height - 140, 50, 20); // Carro 1
  rect(350, height - 140, 50, 20); // Carro 2
}

class Character {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 40;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // Limita o movimento dentro da tela
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.size, this.size); // Personagem
  }

  collidesWith(item) {
    let d = dist(this.x, this.y, item.x, item.y);
    return d < this.size / 2 + item.size / 2;
  }
}

class Item {
  constructor() {
    this.x = random(width);
    this.y = random(height - 200); // Evita aparecer embaixo da rua
    this.size = itemSize;
  }

  display() {
    fill(255, 223, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    isCity = !isCity; // Alterna entre cidade e campo
  }
}