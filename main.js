console.log('1.js-connected');

//////////////// FIREBASE //////////////
// Your web app's Firebase configuration
// let firebaseConfig = {
// 	apiKey: "AIzaSyBEjTnvCCkM4bRr73PJrCbC3HQ46p6cK5I",
//     authDomain: "lzrbit-db.firebaseapp.com",
//     databaseURL: "https://lzrbit-db.firebaseio.com",
//     projectId: "lzrbit-db",
//     storageBucket: "lzrbit-db.appspot.com",
//     messagingSenderId: "488933348339",
//     appId: "1:488933348339:web:eb448d3c1c2d26b3973886",
//     measurementId: "G-TBC5QYT0H4"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// let firestore = firebase.firestore();
//////////////// FIREBASE //////////////

//////////////// CONTROL PARAMS ///////////
let PARAMS = {
	x: 0,
	y: 0,
	line: false,
	lineWidth: 0.1,
	lineColor: '#9acd32',
	dot: false,
	dotWidth: 0.25,
	dotColor: '#ff6347',
	erase: false,
	gridWidth: 1024,
	gridHeight: 1024,
	curve : false,
	curveWidth : 0.1,
	curveColor : '#9acd32',
	counter : 0,
	pointsList : []
};
//////////////// CONTROL PARAMS ///////////

//////////////// TWEAKPANE ////////////////
// TWEAKPANE - INPUT - GRID
// const paneGrid = new Tweakpane({
// 	container: document.getElementById('grid'),
// 	title: 'SCALE GRID',
// });
// paneGrid.addSeparator();
// paneGrid.addInput(PARAMS, 'gridWidth', {
// 	min: 512,
// 	max: 1024,
// 	label: 'Grid width'
// });
// paneGrid.addSeparator();
// paneGrid.addInput(PARAMS, 'gridHeight', {
// 	min: 512,
// 	max: 1024,
// 	label: 'Grid height'
// });
// paneGrid.addSeparator();

// TWEAKPANE - INPUT - DOT
const paneDot = new Tweakpane({
	container: document.getElementById('dot'),
	title: 'DOT PARAMETERS',
});
paneDot.addInput(PARAMS, 'dot', { label: 'Dot on/off' });
paneDot.addInput(PARAMS, 'dotWidth', {
	min: 0.1,
	max: 3,
	label: 'Dot width'
});
paneDot.addInput(PARAMS, 'dotColor', { label: 'Dot color' });
// panelDot - CHANGES : PAINT!
paneDot.on('change', (value) => {
	console.log('dot: ', value);
});

// TWEAKPANE - INPUT - LINE
const paneLine = new Tweakpane({
	container: document.getElementById('line'),
	title: 'LINE PARAMETERS',
});
// console.log(paneLine);
paneLine.addInput(PARAMS, 'line', { label: 'Line on/off' });
paneLine.addInput(PARAMS, 'lineWidth', {
	min: 0,
	max: 3,
	label: 'Line width'
});
paneLine.addInput(PARAMS, 'lineColor', { label: 'Line color' });
// panelLine - CHANGES
paneLine.on('change', (value) => {
	console.log('line: ', value);
});

// TWEAKPANE - INPUT - CURVE
const paneCurve = new Tweakpane({
	container: document.getElementById('curve'),
	title: 'CURVE PARAMETERS',
});
// console.log(curveLine);
paneCurve.addInput(PARAMS, 'curve', { label: 'Curve on/off' });
paneCurve.addInput(PARAMS, 'curveWidth', {
	min: 0,
	max: 3,
	label: 'Curve width'
});
paneCurve.addInput(PARAMS, 'curveColor', { label: 'Curve color' });
// panelLine - CHANGES
paneCurve.on('change', (value) => {
	console.log('curve: ', value);
});

// TWEAKPANE - MONITOR - GYROSCOPE
const paneGyro = new Tweakpane({
	container: document.getElementById('save')
});
// paneAcc.addInput(PARAMS, 'acc',{ label: 'ACCEL (X,Y)'});
paneGyro.addMonitor(PARAMS, 'x', { 
	label: 'GYRO X ',
	// view: 'graph',
	// min: -1000,
	// max: +1000, 
});
paneGyro.addMonitor(PARAMS, 'y', { 
	label: 'GYRO Y ',
	// view: 'graph',
	// min: -1000,
	// max: +1000, 
});

// TWEAKPANE - BUTTON RESET
paneGyro
	.addButton({
		title: 'R E S E T'
	})
	.on('click', () => {
		// erase the galaxy to your desktop
		eraseGalaxy(ctx1);
	});

// TWEAKPANE - BUTTON SAVE
paneGyro
	.addButton({
		title: 'S A V E'
	})
	.on('click', () => {
		// download the galaxy to your desktop
		saveDrawing();
});

// paneGyro - CHANGES FROM FIREBASE
// let docRef = firestore.doc("gyroApp/data");
// docRef.onSnapshot((doc)=> {
// 	const myData = doc.data();
// 	console.log( `dot:${myData.dot} dotWidth:${myData.dotWidth} dotColor:${myData.dotColor}`);
// 	console.log( `x:${myData.x} y:${myData.y} z:${myData.z} `);
// 	console.log( `line:${myData.dot} lineWidth:${myData.lineWidth} lineColor:${myData.lineColor}`);
// })
//////////////// TWEAKPANE ////////////////

//////////////// MICROBIT PAIRING /////////
const pairBtn = document.querySelector('.btn');
pairBtn.addEventListener('click', microbitPairing);
let microbit = new uBit();
let isPaired = false;

function microbitPairing() {
	//1.search
	microbit.searchDevice();
	//2.connect
	microbit.onConnect(() => {
		isPaired = true;
		console.log('isPpared: ', isPaired);
	});
	//3.ble subscription
	microbit.onBleNotify(function() {
		PARAMS.x = microbit.getAccelerometer().x;
		PARAMS.y = microbit.getAccelerometer().y;
	});
	//4. button disappear
	pairBtn.disabled = true;
}
//////////////// MICROBIT PAIRING /////////

//////////////// CANVAS ///////////////////
// CTX-1-BACKGROUND
const canvas1 = document.querySelector('#layer-1');
const ctx1 = canvas1.getContext('2d');
// CTX-2-POINTER
const canvas2 = document.querySelector('#layer-2');
const ctx2 = canvas2.getContext('2d');
// SIZING CANVASES
let w = (canvas1.width = window.innerWidth);
let h = (canvas1.height = window.innerHeight);
// CREATING BRUSH AND POINTER
let brush = new Brush(ctx1,ctx2);
let frame, mx, my;
let pointer = new Brush(ctx1,ctx2);
////////////// DOWNLOAD IMAGE PREP.//////////////

// Animation will be done on the TOP layer ( 2 Canvas )
(function loop() {
	// LZR add composite filter
	ctx1.globalCompositeOperation = 'lighter';
	// Drawing
	if (isPaired) {
		// Drawing Axis in ctx2
		mx = brush.mapValues(PARAMS.x, -PARAMS.gridWidth, PARAMS.gridWidth, 0, w);
		my = brush.mapValues(PARAMS.y, -PARAMS.gridHeight, PARAMS.gridHeight, 0, h);
		brush.drawAxis(mx, my, w, h);
		// Drawing dots and lines in ctx1
		if (PARAMS.dot === true) {
			// Drawing Dot
			// mx = brush.mapValues(PARAMS.x, -PARAMS.gridWidth, PARAMS.gridWidth, 0, w);
			// my = brush.mapValues(PARAMS.y, -PARAMS.gridHeight, PARAMS.gridHeight, 0, h);
			brush.drawDot(mx, my, PARAMS.dotWidth, PARAMS.dotColor);
		}
		// Drawing lines and lines in ctx1
		if (PARAMS.line === true) {
			// Drawing Line
			// mx = brush.mapValues(PARAMS.x, -PARAMS.gridWidth, PARAMS.gridWidth, 0, w);
			// my = brush.mapValues(PARAMS.y, -PARAMS.gridHeight, PARAMS.gridHeight, 0, h);
			brush.drawLine(mx, my, PARAMS.lineWidth, PARAMS.lineColor);
		} 
		// Drawing curves and lines in ctx1
		if (PARAMS.curve === true) {
			// Drawing Curve
			// mx = brush.mapValues(PARAMS.x, -PARAMS.gridWidth, PARAMS.gridWidth, 0, w);
			// my = brush.mapValues(PARAMS.y, -PARAMS.gridHeight, PARAMS.gridHeight, 0, h);
			brush.drawCurve(mx, my, PARAMS.curveWidth, PARAMS.curveColor, PARAMS.counter, PARAMS.pointsList);
			// Adding points
			PARAMS.pointsList.push([mx,my]);
			// Adding counter
			PARAMS.counter++;
			// console.log(`counter: ${PARAMS.counter} PointList: ${PARAMS.pointsList}`);
			// Erasing counter and points
			if(PARAMS.counter > 2) {
				PARAMS.counter = 0;
				PARAMS.pointsList = [];
			}			
		}
		// Eraind all in ctx1
		if (PARAMS.erase === true) {
			ctx1.clearRect(0, 0, w, h);
			PARAMS.erase = false;
		}
	}
	// Loop
	frame = requestAnimationFrame(loop);
})();

// resize canvas
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
	canvas1.width = window.innerWidth;
	canvas1.height = window.innerHeight;
	canvas2.width = window.innerWidth;
	canvas2.height = window.innerHeight;
}
resizeCanvas();

// save drawing ***
function saveDrawing() {
	////////////// DOWNLOAD IMAGE //////////////
	console.log('downloading Galaxy');
	let a = document.createElement('a');
	// document.body.appendChild(a);
	a.href = canvas1.toDataURL('image/png');
	a.download = 'canvas-image.png';
	a.click();
	// document.body.removeChild(a);
	////////////// FIREBASE UPLOAD IMAGE //////////////
	// // image BLOB
	// let imgData = dataURLtoBlob(a.href);
	// // Image NAME + Unique ID number
	// let imgName = `galaxy:${uuidv4()}`;
	// // Upload image to FIREBASE
	// let storageRef = firebase.storage().ref(`images/${imgName}`);
	// // Upload image to selected storage reference
	// let uploadTask = storageRef.put(imgData);
	// uploadTask.on('state_changed', (snapshot)=> {
	// 	// observe state chenge events such as progress, pause, resume
	// 	// get task progress by including the number of bytes uploaded and total number of bytes
	// 	let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
	// 	console.log(`upload progress: ${progress} done`);
	// }, function(error){
	// 	console.log(error.message);
	// }, function(){
	// 	// handle successful uploads on complete
	// 	uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL)=> {
	// 		// get your upload image URL here..p5.BandPass()
	// 		console.log(downloadURL);
	// 	})
	// })
}

//**dataURL to blob */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}

// Unique Id for Firebase Storage
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }

  function eraseGalaxy(ctx1) {
	PARAMS.erase = true;
  }

//////////////// CANVAS ///////////////////

//////////////// SLIDE-PANEL //////////////
document.addEventListener('DOMContentLoaded', function() {
	const menuElement = document.getElementById('menu-right');
	const menu = new SlideMenu(menuElement);

	// Attach the event listener to the *DOM element*, not the SlideMenu instance
	menuElement.addEventListener('sm.open', function() {
		console.log('The menu opens');
	});

	menuElement.addEventListener('sm.open-after', function() {
		console.log('The menu has opened');
	});
});
//////////////// SLIDE-PANEL //////////////