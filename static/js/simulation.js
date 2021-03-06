const pixelSize = 5//Math.floor(screen.availHeight/100) - 1

//Create the renderer
// var renderer = PIXI.autoDetectRenderer(256, 256);
// renderer.view.style.borderStyle = "solid";
// renderer.view.style.borderColor = "rgba(0,0,0,1)";
// renderer.view.style.borderWidth = "0px 0px 1px 1px";
// renderer.backgroundColor = 0x061639;
// renderer.view.style.float = "left";
// // autoResize assures that size matches resolution
// renderer.autoResize = true;
// renderer.resize(pixelSize*100, pixelSize*100);
//Add the canvas to the HTML document
//document.body.appendChild(renderer.view);
var app = new PIXI.Application(500, 500, {autoStart : true, antialias: false });
document.body.appendChild(app.view);

//Create a container object called the `stage`
//var stage = app.stage;
//Tell the `renderer` to `render` the `stage`
//renderer.render(stage);
var canvasGrid = create2DArray(100)

function create2DArray(dimension){
    var a = new Array(dimension)
    for(i=0;i<dimension;i++){
        a[i] = new Array(dimension)
    }
    return a;
}

function initCanvasGrid(grid){
    for(i=0;i<100;i++){
        for(j=0;j<100;j++){
            grid[i][j] = new tile("0xaa8855",i*pixelSize,j*pixelSize)
            app.stage.addChild(grid[i][j].rectangle)
        }
    }
    //renderer.render(stage)
    try {
        colorgrid()
    } catch (e) {
        console.log(e)
    } finally {
        setTimeout(function () {
            colorgrid()
        }, 200);
    }
}

function initSimGrid(grid){
    for(i=0;i<100;i++){
        for(j=0;j<100;j++){
            let p = Math.random();
            if(p < 0.7){
                grid[i][j] = new tree();
            }
        }
    }
}

initCanvasGrid(canvasGrid)

function updateTile(tile, color){
    tile.rectangle.beginFill(color);
    tile.rectangle.lineStyle(1,"0x000000",1);
    tile.rectangle.drawRect(tile.x,tile.y,pixelSize,pixelSize);
    tile.rectangle.endFill();
    app.stage.addChild(tile.rectangle)
}

function updateCanvasGrid(){
    //var s = Math.floor(Math.random()*256)//16777215)
    for(i=0;i<100;i++){
        for(j=0;j<100;j++){
            let x = canvasGrid[i][j];
            let y = simGrid[i][j];
            //console.log("update grid " + i +" - "+j)
            //let color = "0x" + (s).toString(16) + (i+100).toString(16) +(j+100).toString(16);
            //console.log(color);
            if(y === undefined){
                continue;
            }
            if(y.type === 'tree'){
                updateTile(x, y.color)
            }
        }
    }
    //renderer.render(stage)
}


//tile object constructor
function tile(color,posX,posY){
    rec = new PIXI.Graphics()
    rec.beginFill(color);
    rec.lineStyle(1,"0x000000",1);
    rec.drawRect(posX,posY,pixelSize,pixelSize);
    rec.endFill();
    this.rectangle = rec;
    this.x = posX;
    this.y = posY;
}

function randomHexColor(){
    // random hex number
    return '0x'+Math.floor(Math.random()*16777215).toString(16)
}

//var timer = setInterval(test, 2000);
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
//var jsonmap = JSON.parse(Get("./mapdata2.json"));
//console.log("this is the author name: "+json_obj.author_name);

var seaTiles   = [];
var grassTiles = [];
function colorgrid(){
    for(i=0; i<10000; i++){
        let x = Math.floor(i/100);
        let y = i%100;
        let color = "0xff0000";
        //console.log(x + " " + y + " " + color);
        let tile = canvasGrid[x][y];
        switch (mapdata[i]) {
            case 'urban':
                let grey = Math.floor(100 + Math.random()*50).toString(16);
                color = "0x" + grey + grey + grey
                break;
            case 'sea':
                seaTiles.push(i);
                color = "0x0022"+ Math.floor(155 + Math.random()*100).toString(16);
                break;
            case 'sand':
                color = "0xff" + Math.floor(155 + Math.random()*100).toString(16) + "33";
                break;
            case 'marsh':
                color = "0x66" + Math.floor(100 + Math.random()*100).toString(16) +"55"
                break;
            case 'grass':
                grassTiles.push(i)
                color = "0x00" + Math.floor(50 + Math.random()*100).toString(16) + "00"
                break;
            default:
                color = "0xff0000"

        }
        //canvasGrid[x][y] = new tile(color,x*pixelSize,y*pixelSize);
        updateTile(tile, color)
    }
    //renderer.render(stage)
}

var stepCounter = 0;
function nextStep(){
  // update step counter
  stepCounter += 1;
  let c = document.getElementById("step")
  c.style.fontWeight = 700
  c.innerText = stepCounter;
  // move things
  hashMap.forEach(function(value,key){
    value.step()
  });
}


var inter;
function start(){
    inter = setInterval(function () {
        nextStep()
    }, 500);
}

function stop(){
    clearInterval(inter);
}
