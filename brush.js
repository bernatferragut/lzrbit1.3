
class Brush {
	// class attributes
	constructor(ctx1, ctx2){
		this.context1 = ctx1;
		this.context2 = ctx2;
		this.axisSize = 2;
		this.start_x = window.innerWidth/2;
		this.start_y = window.innerHeight/2;
	}
	// class methods
	drawDot(mx, my, size, color) {
		// style
		this.context1.fillStyle = color;
		// dot
		this.context1.fillRect(mx, my, size,size);
	}
	drawLine(mx, my, size, color){
		// style
		this.context1.strokeStyle = color;
		this.context1.lineWidth = size;
		this.context1.lineCap = 'round'
		// line
		this.context1.lineTo(mx,my);
		this.context1.stroke();
		this.context1.beginPath();
		this.context1.moveTo(mx,my);
	}
	drawCurve(mx, my, size, color,counter,pointsList){
		// style
		this.context1.strokeStyle = color;
		this.context1.lineWidth = size;
		this.context1.lineCap = 'round'
		// we pass constantly 3 points list from main.js
		if( counter === 2) {
			// console.log( `counter: ${counter}, pointList: ${pointsList}`);
			this.context1.beginPath();
			// move to the starting point
			this.context1.moveTo(this.start_x, this.start_y);
			// bezier curve
			this.context1.bezierCurveTo(pointsList[0][0], pointsList[0][1], pointsList[1][0], pointsList[1][1],mx, my);
			// this.context1.quadraticCurveTo(pointsList[0][0], pointsList[0][1],mx, my);
			this.context1.stroke();
			// the last point will be the first in the next round
			this.start_x = mx;
			this.start_y = my;
		}
	}
	// mapping microbit values to screen sizes
	mapValues(n, start1, stop1, start2, stop2) {
		return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
	}
	// AXIS
	drawAxis(mx,my,w,h) {
		// Background Color
		ctx2.clearRect(0, 0, w, h);
		// circle 1
		ctx2.beginPath();
		ctx2.arc(mx, my, this.axisSize, 0, 2 * Math.PI, false);
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = '#ff6347';
		ctx2.stroke();
		// circle 2
		// ctx2.beginPath();
		// ctx2.arc(mx, my, this.axisSize*4, 0, 2 * Math.PI, false);
		// ctx2.lineWidth = 1;
		// ctx2.strokeStyle = '#ff6347';
		// ctx2.stroke();
	}
}