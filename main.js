let numb, w, grid = [], click_grid=[];

function setup(){
  createCanvas(600, 600);
  background(210);
  numb=0;
}

function draw(){

}

function mouseClicked(){
  let x = mouseX;
  let y = mouseY;

  if(x < 150 || x >= 600 || y < 150 || y >= 600){ return; }

  x -= 150;
  y -= 150;

  let i = floor(x*numb/450);
  let j = floor(y*numb/450);
  if(click_grid[j][i] == 0){
    click_grid[j][i] = 1;
    fill(0);
    stroke(0);
    rect(153 + i*450/numb,153 + j*450/numb, 450/numb-6, 450/numb-6);
  }
  else{
    click_grid[j][i] = 0;
    fill(210);
    stroke(210);
    rect(153 + i*450/numb,153 + j*450/numb, 450/numb-6, 450/numb-6);
  }

  for(let z=0; z<numb; z++){
    for(let w=0; w < numb; w++){
      if(click_grid[z][w] != grid[z][w]){ return; }
    }
  }
  noLoop();
  textAlign(CENTER, CENTER);
  textSize(150);
  fill(0, 255, 0);
  strokeWeight(3);
  stroke(0);
  text("You Win!", 300, 300);
}

function butt(){
  numb = document.getElementById('texth').value;

  let n = numb*numb, p = 0.5, d = 0.65/(n+1), b = true, u = 0, cnt = 0;
  let v = [];

  for(let i = 0; i < n; i++){ v.push(0); }
  while(b){
    for(let i = 0; i < n; i++){
      if(v[i] == 0 && random() < p){
        p -= d;
        u++;
        v[i] = 1;
        if(u >= (n*0.65)){ b = false; break; }
      }
    }
    if(!b){ break; }
    for(let i = n-1; i >= 0; i--){
      if(v[i] == 0 && random() < p){
        p -= d;
        u++;
        v[i] = 1;
        if(u >= (n*0.65)){ b = false; break; }
      }
    }
  }

  for(let i = 0; i < numb; i++){
    click_grid.push([]);
    grid.push([]);
    for(let  j = 0; j < numb; j++){
      grid[i].push(v[cnt]);
      click_grid[i].push(0);
      cnt++;
    }
  }

  stroke(0);
  strokeWeight(1);
  noFill();

  push()
  translate(75, 75);
  rotate(-PI/4);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  text("Nonogram", 0, 0);
  pop()

  w = 450 / numb;

  for(let i = 0; i < numb; i++){
    if(i % 5 == 0){strokeWeight(2);}
    else{strokeWeight(1);}
    line(150+w*i, 0, 150+w*i, 600);
    line(0, 150+w*i, 600, 150+w*i);
  }

  // Lateral text
  textAlign(CENTER, CENTER);
  textSize(15);
  fill(0);
  for(let  i = 0; i < numb; i++){
    let carry = 0;
    let space = 0;
    for(let j = numb-1; j >= 0; j--){
      if(grid[i][j] == 0){
        if(carry != 0){
          text(str(carry), 140-(space*19), 160+(i*450/numb));
          space++;
        }
        carry = 0;
      }
      else{
        carry++;
      }
    }
    if(carry != 0){
      text(str(carry), 140-(space*19), 160+(i*450/numb));
    }
  }

  for(let  j = 0; j < numb; j++){
    let carry = 0;
    let space = 0;
    for(let i = numb-1; i >= 0; i--){
      if(grid[i][j] == 0){
        if(carry != 0){
          text(str(carry), 158+(j*450/numb), 140-(space*18));
          space++;
        }
        carry = 0;
      }
      else{
        carry++;
      }
    }
    if(carry != 0){
      text(str(carry), 158+(j*450/numb),140-(space*18));
    }
  }

}
