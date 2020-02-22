
class Brush {
	// class attributes
	constructor(ctx1, ctx2){
		this.context1 = ctx1;
		this.context2 = ctx2;
		this.axisSize = 2;
	}
	// class methods
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
	drawDot(mx, my, size, color) {
		// style
		this.context1.fillStyle = color;
		// dot
		this.context1.fillRect(mx, my, size,size);
	}
	drawAxis(mx,my,w,h) {
		// Background Color
		ctx2.clearRect(0, 0, w, h);
		// circle 1
		ctx2.beginPath();
		ctx2.arc(mx, my, this.axisSize, 0, 2 * Math.PI, false);
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = 'yellowgreen';
		ctx2.stroke();
		// circle 2
		ctx2.beginPath();
		ctx2.arc(mx, my, this.axisSize*4, 0, 2 * Math.PI, false);
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = '#ff6347';
		ctx2.stroke();
	}
    // mapping microbit values to screen sizes
    mapValues(n, start1, stop1, start2, stop2) {
		return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
	}
}