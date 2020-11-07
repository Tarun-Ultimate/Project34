//Create variables here
var dog,happyDog,database,foodS,foodStock; 

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,20,20)
  dog.addImage(dogimg)
  dog.scale = 0.5;
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogHappy)
  }
  drawSprites();
  //add styles here
  textSize(15)
  fill("white") 
  stroke(5) 
  text("Food Remaining : "+ foodS,350,20)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  }) 
}

