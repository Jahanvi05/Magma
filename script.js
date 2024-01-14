
//PAGE 1  
function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
el: document.querySelector("#main"),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
loco()

//PAGE 2

var clutter = "";

document.querySelector("#page2>h1").textContent.split("").forEach(function(dets){ //selecting the elemnt page2
  clutter += `<span>${dets}</span>`

  document.querySelector("#page2>h1").innerHTML = clutter;
})


gsap.to("#page2>h1>span",{
  scrollTrigger:{
      trigger:`#page2>h1>span`,
      start:`top bottom`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5, //Specifies the smoothness of the scrubbing effect during scrolling.
  },
  stagger:.2, // introduces a stagger effect, causing each span to start its animation 0.2 seconds after the previous one.
  color:`#fff`
})


//PAGE 3

function canvas3(){
  const canvas = document.querySelector("#page3>canvas"); //selecting the id page3 canvas
const context = canvas.getContext("2d"); //2d canvas

//height and width of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//set the height and width of the page when resized
window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render(); //calling the render function
});


//inserting the images in the data array
function files(index) {
var data = `
./media/frames00007.png
./media/frames00010.png
./media/frames00013.png
./media/frames00016.png
./media/frames00019.png
./media/frames00022.png
./media/frames00025.png
./media/frames00028.png
./media/frames00031.png
./media/frames00034.png
./media/frames00037.png
./media/frames00040.png
./media/frames00043.png
./media/frames00046.png
./media/frames00049.png
./media/frames00052.png
./media/frames00055.png
./media/frames00058.png
./media/frames00061.png
./media/frames00064.png
./media/frames00067.png
./media/frames00070.png
./media/frames00073.png
./media/frames00076.png
./media/frames00079.png
./media/frames00082.png
./media/frames00085.png
./media/frames00088.png
./media/frames00091.png
./media/frames00094.png
./media/frames00097.png
./media/frames00100.png
./media/frames00103.png
./media/frames00106.png
./media/frames00109.png
./media/frames00112.png
./media/frames00115.png
./media/frames00118.png
./media/frames00121.png
./media/frames00124.png
./media/frames00127.png
./media/frames00130.png
./media/frames00133.png
./media/frames00136.png
./media/frames00139.png
./media/frames00142.png
./media/frames00145.png
./media/frames00148.png
./media/frames00151.png
./media/frames00154.png
./media/frames00157.png
./media/frames00160.png
./media/frames00163.png
./media/frames00166.png
./media/frames00169.png
./media/frames00172.png
./media/frames00175.png
./media/frames00178.png
./media/frames00181.png
./media/frames00184.png
./media/frames00187.png
./media/frames00190.png
./media/frames00193.png
./media/frames00196.png
./media/frames00199.png
./media/frames00202.png
`;
return data.split("\n")[index]; //returnig the images accordig to the index passed inside the index
}


// famescount = no of images used , It will take the images till the framecount(shoul be eual to the no of images used)
const frameCount = 67; 

const images = []; //array
const imageSeq = {
frame: 1, //starts from the frame 1
};


// fro loop till the framecount , push the images in the images array
for (let i = 0; i < frameCount; i++) { 
const img = new Image();
img.src = files(i);
images.push(img); //pushing the image in the array
}

//image sequence
gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
//scrollTigger script 
scrollTrigger: {
  scrub: .5,
  trigger: `#page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

// sarts from the image index 1
images[1].onload = render;


//frunction render , scaleImage is he function gaving 2 arguments and an array images
function render() {
scaleImage(images[imageSeq.frame], context); //context contains all the 2d tools
}


//set all the canvas
function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;

//whrn new frame comes remove the last or previous frame to ignore ant glitches
ctx.clearRect(0, 0, canvas.width, canvas.height);

//settung up the new frame
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}

//ScrollTrigger or pin the new images
ScrollTrigger.create({

trigger: "#page3",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas3()

//PAGE 4

var clutter = "";

document.querySelector("#page4>h1").textContent.split("").forEach(function(dets){ //selecting the elemnt page2
  clutter += `<span>${dets}</span>`

  document.querySelector("#page4>h1").innerHTML = clutter;
})


gsap.to("#page4>h1>span",{
  scrollTrigger:{
      trigger:`#page4>h1>span`,
      start:`top bottom`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5, //Specifies the smoothness of the scrubbing effect during scrolling.
  },
  stagger:.2, // introduces a stagger effect, causing each span to start its animation 0.2 seconds after the previous one.
  color:`#fff`
})



//PAGE 5

function canvas5(){
  const canvas = document.querySelector("#page5>canvas"); //selecting the id page3 canvas
const context = canvas.getContext("2d"); //2d canvas

//height and width of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//set the height and width of the page when resized
window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render(); //calling the render function
});


//inserting the images in the data array
function files(index) {
var data = `
./media/bridges00004.png
./media/bridges00007.png
./media/bridges00010.png
./media/bridges00013.png
./media/bridges00016.png
./media/bridges00019.png
./media/bridges00022.png
./media/bridges00025.png
./media/bridges00028.png
./media/bridges00031.png
./media/bridges00034.png
./media/bridges00037.png
./media/bridges00040.png
./media/bridges00043.png
./media/bridges00046.png
./media/bridges00049.png
./media/bridges00052.png
./media/bridges00055.png
./media/bridges00058.png
./media/bridges00061.png
./media/bridges00064.png
./media/bridges00067.png
./media/bridges00070.png
./media/bridges00073.png
./media/bridges00076.png
./media/bridges00079.png
./media/bridges00082.png
./media/bridges00085.png
./media/bridges00088.png
./media/bridges00091.png
./media/bridges00094.png
./media/bridges00097.png
./media/bridges00100.png
./media/bridges00103.png
./media/bridges00106.png
./media/bridges00109.png
./media/bridges00112.png
./media/bridges00115.png
./media/bridges00118.png
./media/bridges00121.png
./media/bridges00124.png
./media/bridges00127.png
./media/bridges00130.png
./media/bridges00133.png
./media/bridges00136.png
./media/bridges00139.png
./media/bridges00142.png
./media/bridges00145.png
./media/bridges00148.png
./media/bridges00151.png
./media/bridges00154.png
./media/bridges00157.png
./media/bridges00160.png
./media/bridges00163.png
./media/bridges00166.png
./media/bridges00169.png
./media/bridges00172.png
./media/bridges00175.png
./media/bridges00178.png
./media/bridges00181.png
./media/bridges00184.png
./media/bridges00187.png
./media/bridges00190.png
./media/bridges00193.png
./media/bridges00196.png
./media/bridges00199.png
./media/bridges00202.png
`;
return data.split("\n")[index]; //returnig the images accordig to the index passed inside the index
}


// famescount = no of images used , It will take the images till the framecount(shoul be eual to the no of images used)
const frameCount = 67; 

const images = []; //array
const imageSeq = {
frame: 1, //starts from the frame 1
};


// fro loop till the framecount , push the images in the images array
for (let i = 0; i < frameCount; i++) { 
const img = new Image();
img.src = files(i);
images.push(img); //pushing the image in the array
}

//image sequence
gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
//scrollTigger script 
scrollTrigger: {
  scrub: .5,
  trigger: `#page5`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

// sarts from the image index 1
images[1].onload = render;


//frunction render , scaleImage is he function gaving 2 arguments and an array images
function render() {
scaleImage(images[imageSeq.frame], context); //context contains all the 2d tools
}


//set all the canvas
function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;

//whrn new frame comes remove the last or previous frame to ignore ant glitches
ctx.clearRect(0, 0, canvas.width, canvas.height);

//settung up the new frame
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}

//ScrollTrigger or pin the new images
ScrollTrigger.create({

trigger: "#page5",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas5()

//PAGE 6

var clutter = "";

document.querySelector("#page6>h1").textContent.split("").forEach(function(dets){ //selecting the elemnt page6
  clutter += `<span>${dets}</span>`

  document.querySelector("#page6>h1").innerHTML = clutter;
})


gsap.to("#page6>h1>span",{
  scrollTrigger:{
      trigger:`#page6>h1>span`,
      start:`top bottom`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5, //Specifies the smoothness of the scrubbing effect during scrolling.
  },
  stagger:.2, // introduces a stagger effect, causing each span to start its animation 0.2 seconds after the previous one.
  color:`#fff`
})


//page 7

function canvas7(){
  const canvas = document.querySelector("#page7>canvas"); //selecting the id page3 canvas
const context = canvas.getContext("2d"); //2d canvas

//height and width of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//set the height and width of the page when resized
window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render(); //calling the render function
});


//inserting the images in the data array
function files(index) {
var data = `
https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
return data.split("\n")[index]; //returnig the images accordig to the index passed inside the index
}


// famescount = no of images used , It will take the images till the framecount(shoul be eual to the no of images used)
const frameCount = 136; 

const images = []; //array
const imageSeq = {
frame: 1, //starts from the frame 1
};


// fro loop till the framecount , push the images in the images array
for (let i = 0; i < frameCount; i++) { 
const img = new Image();
img.src = files(i);
images.push(img); //pushing the image in the array
}

//image sequence
gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
//scrollTigger script 
scrollTrigger: {
  scrub: .5,
  trigger: `#page7`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

// sarts from the image index 1
images[1].onload = render;


//frunction render , scaleImage is he function gaving 2 arguments and an array images
function render() {
scaleImage(images[imageSeq.frame], context); //context contains all the 2d tools
}


//set all the canvas
function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;

//whrn new frame comes remove the last or previous frame to ignore ant glitches
ctx.clearRect(0, 0, canvas.width, canvas.height);

//settung up the new frame
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}

//ScrollTrigger or pin the new images
ScrollTrigger.create({

trigger: "#page7",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas7()


//PAGE 7 CIR

gsap.to(".page7-cir",
{
  scrollTrigger:{
    trigger:`.page7-cir`,
    start:`top center`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5
  },
  scale:1.5,
})

gsap.to(".page7-innercir",
{
  scrollTrigger:{
    trigger:`.page7-innercir`,
    start:`top center`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5
  },
  backgroundColor : `#0a3bce91`,
})

