

function colorPalette1(seed, hueMode)
{

  var h = calcHue(seed, hueMode);
  var s = 0.5 + Math.pow(seed,2.0) * 0.5;
  var l = 0.25 + 0.45 * (1.0 - Math.pow(seed,0.5));

  var rgb = hslToRgb(h,s,l);
  var c = new THREE.Color(rgb[0], rgb[1], rgb[2]);

  return c;
}

function colorPalette2(seed, hueMode)
{
  var h = calcHue(seed, hueMode);

  if(seed < 0.5)
  {
    var s = 0.65 - seed * 0.5;
    var l = 0.3 * (1.0 - seed);
  }
  else
  {
    var s = 0.65 - (1.0 - seed) * 0.5;
    var l = 0.7 - (seed - .5) * 0.4;
  }

  var rgb = hslToRgb(h,s,l);
  var c = new THREE.Color(rgb[0], rgb[1], rgb[2]);

  return c;

}

function colorPalette3(seed, hueMode)
{
  var h = calcHue(seed, hueMode);

  if(seed < 0.5)
  {
    var s = 0.5 - (0.5 - seed) * 0.5;
    var l = 0.3 + seed;
  }
  else
  {
    var s = 0.65 - seed * 0.5;
    var l = 0.3 - seed * 0.1;
  }

  var rgb = hslToRgb(h,s,l);
  var c = new THREE.Color(rgb[0], rgb[1], rgb[2]);

  return c;

}

function calcHue(seed, mode)
{
  switch (mode) {
    case 0: return -0.03 + seed * 0.06;
    case 1: return  0.03 - seed * 0.06;
    case 2: return -0.03 + Math.sin(seed * Math.PI) * 0.06;
    case 3: return -0.03 + Math.random() * 0.06;
  }
}




var renderer = new THREE.WebGLRenderer();

document.body.appendChild( renderer.domElement );

var width = window.innerWidth;
var height = window.innerHeight;
var canvas;
var mousePos = new THREE.Vector2(0,0);

canvas = renderer.domElement;
renderer.setSize(width, height);

canvas.addEventListener("mousemove", function (e) {

  mousePos.set(e.clientX/width, e.clientY/height);

}, false);

canvas.addEventListener("touchstart", function (e) {

  mousePos.set(e.touches[0].clientX /width, e.touches[0].clientY / height);
  //console.log(mousePos);

}, false);


var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1000;

scene = new THREE.Scene();

var size = 25;
var stack = 0;

for(var k = 0; k < 4; k++){

var x_incr = -width/2;

  for(var j = 0; j < 10; j++)
  {
    var y_incr = height/2 - stack;
    x_incr += size * 2.25;
    var colSeed = j/10.0;

    for(var i = 0; i < 3; i++)
    {

      y_incr -= size * 2.25;
      var geometry = new THREE.Geometry();

      geometry.vertices.push(
        new THREE.Vector3( -size + x_incr,  size + y_incr, 500 ),
        new THREE.Vector3( -size + x_incr, -size + y_incr, 500 ),
        new THREE.Vector3(  size + x_incr, -size + y_incr, 500 ),
        new THREE.Vector3(  size + x_incr, size  + y_incr, 500 )
      );

      geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
      geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

      switch (i) {
        case 0:
        var col = colorPalette1(colSeed, k);
        break;
        case 1:
        var col = colorPalette2(colSeed, k);
        break;
        case 2:
        var col = colorPalette3(colSeed, k);
        break;
      }

      var material = new THREE.MeshBasicMaterial( { color: "#" + col.getHexString(), side: THREE.DoubleSide } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

    }
  }
  stack += 200;
}



function render() {



  renderer.render( scene, camera );
  //requestAnimationFrame( render );

}

render();
