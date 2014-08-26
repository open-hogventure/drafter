	( function(_win) {
    var painter = {};
    painter.vtx = null;
    painter.itx = null;
    painter.btx = null;
	  painter.bb = false;
    painter.ibb = false;
	  painter.image = null;
	  painter.image_src = null;
	  painter.bbtop = 0;
    painter.bbleft = 0;
    painter.bbwidth = 0;
    painter.bbheight = 0;
	  painter.paletteBB = null;

	  painter.lineWidth = 1.5;
	  painter.right_color = [127,127,127];
	  painter.active_color = 'foreground';
	  painter.color = [0,0,0];
	  painter.alpha = 1;
	  painter.fillColor = [127,127,127];
	  painter.fillAlpha = 1;

  painter.createBackBuffer = function (w, h) {
		var cb = document.createElement('canvas');
		cb.width = w;
		cb.height = h;
		cb.style.width = w + 'px';
		cb.style.height = h + 'px';
		return cb;
	};

	painter.setLineWidth = function () {
		var value = getElement('prompt_input_line_width').value;
		getElement('prompt_line_width').innerHTML = value;
		painter.image.currentActivity.lineWidth = value;
		painter.lineWidth = value;
	};

	painter.openPalette = function () {
		painter.showPrompt('Choose your painter.color, line-width, or drawing method.</h1>' +
			'<img src="" id="imagePalette" style="width: 70%; margin-left: 15%; margin-top: 0.5%; height: auto; background: url('+backtexture+');" />' +
			'<input id="prompt_input_line_width" type="range" min="0.5" max="100" step="0.5" value="1.5" style="margin: 0.5%;" onchange="painter.setLineWidth();" /> line width <span id="prompt_line_width">1.5</span><br />',['painter.closePalette();','done']);
		painter.drawPalette();
	};

  painter.showPrompt = function() {
		var args = arguments;
		var prompt = createElement('div');
		prompt.innerHTML = '';
    prompt.setAttribute('id','prompt');
		prompt.style.width = prompt.style.maxWidth = (cvs.width / 2) +'px';
		prompt.style.height = prompt.style.maxHeight = Math.round(cvs.height * 0.95) +'px';
		prompt.style.position = 'absolute';
    prompt.style.top = Math.round(cvs.height * 0.025) +'px';
		prompt.style.left = Math.round(cvs.width / 4) +'px';
		prompt.style.display = 'block';
    prompt.style.background = '#eee';
		prompt.style.boxShadow = '10px 10px 15px #000';
    var ele = document.createElement('h1');
		ele.innerHTML = args[0];
    ele.style.fontSize = '12px';
		prompt.appendChild(ele);
		ele = document.createElement('br');
		prompt.appendChild(ele);
		for (var i = 1; i < args.length; i++)
		{
			ele = document.createElement('input');
			ele.setAttribute('type','button');
			ele.setAttribute('onclick',args[i][0]);
			//ele.onclick = args[i][0];
			ele.setAttribute('value',args[i][1]);
			prompt.appendChild(ele);
			if (i % 2 == 1)
			{
				ele = document.createElement('br');
			}
			prompt.appendChild(ele);
		}
    document.body.appendChild(prompt);
		console.log('showPrompt '+args.length);
	};

	painter.closePrompt = function() {
		document.body.removeChild(getElement('prompt'));
	};

	painter.closePalette = function() {
		painter.closePrompt();
	};
	/**
	@method painter.drawPalette
	*/
	painter.drawPalette = function() {
		painter.paletteBB = painter.createBackBuffer(300, 255);

		getElement('imagePalette').addEventListener('mouseup', painter.selectColor, false);

		var ctxPalette = painter.paletteBB.getContext("2d");

		var lineagrad = ctxPalette.createLinearGradient(0,0,0,255);
		lineagrad.addColorStop(0, '#fff');
		lineagrad.addColorStop(1, '#000');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(0,0,255,255);

		lineagrad = ctxPalette.createLinearGradient(0,0,250,0);
		lineagrad.addColorStop(0, 'rgba('+painter.right_color[0]+','+painter.right_color[1]+','+painter.right_color[2]+',1)');
		lineagrad.addColorStop(1, 'rgba('+painter.right_color[0]+','+painter.right_color[1]+','+painter.right_color[2]+',0)');

		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(0,0,250,255);

		lineagrad = ctxPalette.createLinearGradient(300,0,300,43);
		lineagrad.addColorStop(0, '#000');
		lineagrad.addColorStop(1, '#333');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,0,300,43);

		lineagrad = ctxPalette.createLinearGradient(300,43,300,85);
		lineagrad.addColorStop(0, '#333');
		lineagrad.addColorStop(1, '#666');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,43,300,85);

		lineagrad = ctxPalette.createLinearGradient(300,85,300,128);
		lineagrad.addColorStop(0, '#666');
		lineagrad.addColorStop(1, '#999');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,85,300,128);

		lineagrad = ctxPalette.createLinearGradient(300,128,300,171);
		lineagrad.addColorStop(0, '#999');
		lineagrad.addColorStop(1, '#bbb');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,128,300,171);

		lineagrad = ctxPalette.createLinearGradient(300,171,300,214);
		lineagrad.addColorStop(0, '#bbb');
		lineagrad.addColorStop(1, '#ddd');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,171,300,214);

		lineagrad = ctxPalette.createLinearGradient(300,214,300,255);
		lineagrad.addColorStop(0, '#ddd');
		lineagrad.addColorStop(1, '#fff');
		ctxPalette.fillStyle = lineagrad;
		ctxPalette.fillRect(283,214,300,255);

		ctxPalette.fillStyle = 'rgba('+(painter.active_color == 'foreground' ? (painter.color[0]+','+painter.color[1]+','+painter.color[2]+','+painter.alpha) : (painter.fillColor[0]+','+painter.fillColor[1]+','+painter.fillColor[2]+','+painter.fillAlpha))+')';
		ctxPalette.fillRect(260,0,15,255);

		getElement('imagePalette').src = painter.paletteBB.toDataURL('painter.image/png');
	};

	painter.selectColor = function (event) {
		//canvasPalette = getElement('canvasPalette');
		console.log( 'img -> '+ event.pageX+', '+event.pageY);
		var imagePalette = getElement('imagePalette');
		var prompt = getElement('prompt');
		var x = Math.round((event.pageX - prompt.offsetLeft - imagePalette.offsetLeft) / imagePalette.offsetWidth * 300);
		var y = Math.round((event.pageY - prompt.offsetTop - imagePalette.offsetTop) / imagePalette.offsetHeight * 255); ;
		console.log( 'img -> '+ event.pageX+', '+event.pageY+' '+ imagePalette.offsetLeft+', '+imagePalette.offsetWidth+' '+ imagePalette.offsetTop+', '+imagePalette.offsetHeight+' x='+x+', y='+y);
		var ctxPalette = painter.paletteBB.getContext("2d");
		var data;
		if (x <= 255 )
		{
			data = ctxPalette.getImageData(x,y,1,1).data;
			if (painter.active_color == 'foreground')
			{
				painter.color = data;
			} else {
				painter.fillColor = data;
			}
			painter.image.currentActivity.r = data[0];
			painter.image.currentActivity.g = data[1];
			painter.image.currentActivity.b = data[2];
			console.log( 'img -> '+ "painter.color="+painter.color);
			painter.drawPalette();
			ctxPalette.strokeStyle = 'rgba(0,0,0,0.75)';
			ctxPalette.beginPath();
			ctxPalette.arc(x,y,3,3,Math.PI*2,true);
			ctxPalette.stroke();
			//painter.setColor(painter.active_color);
		} else if (x > 256 && x < 283)
		{
			var _y = y;
			if (_y % 15 < 8)
			{
				_y = _y - (_y % 15);
			} else {
				_y = _y + (15 - (_y % 15));
			}
			if (painter.active_color == 'foreground')
			{
				painter.alpha = _y / 255;
				console.log( 'img -> '+ "painter.alpha="+painter.alpha);
			} else {
				painter.fillAlpha = _y / 255;
				console.log( 'img -> '+ "background painter.alpha="+painter.fillAlpha);
				painter.image.currentActivity.a = painter.alpha;
			}

			painter.drawPalette();
			ctxPalette.strokeStyle = 'rgba(0,0,0,0.75)';
			ctxPalette.beginPath();
			ctxPalette.moveTo(257,y)
			ctxPalette.lineTo(280,y);
			ctxPalette.stroke();
			//painter.setColor(painter.active_color);

		} else if (x >=283)
		{
			data = ctxPalette.getImageData(x,y,1,1).data;
			painter.right_color = data;
			console.log( 'img -> '+ painter.color);
			painter.drawPalette();
			ctxPalette.strokeStyle = 'rgba(0,0,0,0.75)';
			ctxPalette.beginPath();
			ctxPalette.moveTo(283,y)
			ctxPalette.lineTo(300,y);
			ctxPalette.stroke();
		}
	};

    _win.painter = painter;
  })(window);

	function VectorLayer() {
		this.currentActivity = new VectorActivity();
		this.allActivities = [];
		this.width = 1;
		this.height = 1;

		this.load = function(json) {
			this.currentActivity = new VectorActivity();
			this.currentActivity.load(json['currentActivity']);

			this.allActivities = [];
			for (var i = 0; i < json['allActivities'].length; i++)
			{
				this.allActivities[i] = new VectorActivity();
				this.allActivities[i].load(json['allActivities'][i]);
			}
		}

		this.store = function(json) {
			return JSON.stringify(this);
		}
	}

	function VectorActivity() {
		this.points = [];
		this.activity = 'draw';
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 1;
		painter.lineWidth = 1;

		this.init = function(_points, _act, _r, _g, _b, _a, _lw) {
			this.points = _points;
			this.activity = _act;
			this.r = _r;
			this.g = _g;
			this.b = _b;
			this.a = _a;
			painter.lineWidth = _lw;
		}

		this.getStrokeStyle = function() {
			return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
		}

		this.load = function(json) {
			this.points = json['points'];
			this.activity = json['activity'];
			this.r = json['r'];
			this.g = json['g'];
			this.b = json['b'];
			this.a = json['a'];
			painter.lineWidth = json['painter.lineWidth'];
		}

		this.store = function(json) {
			return JSON.stringify(this);
		}
	}
  /**
  @method deactivate
  @since 2014-08-14
  */
	painter.deactivate = function () {
		var uid = uidcounter.createNew();
		//ctx.clearRect(0, 0, cvs.width, cvs.height);
		
    game.mediamanager.setMedia(uid, painter.image_src);
    /*if (painter.image.allActivities.length > 0)
		{
			//prompt and show the painter.image and ask!
			game.mediamanager.setMedia(uid, painter.image_src);
		}*/ 
		setImage(uid, mode);
    mode = 'normal';
    update = true;
	}
  /**
  @method mousePressed
  */
	painter.mousePressed = function (x, y) {
		//x = (x - (painter.bbleft/cvs.width));
		//y = (y - (painter.bbtop/cvs.height));
		painter.image.currentActivity.points.push([x, y]);
		update = true;
	};
  /**
  @method mouseReleased
  @since 2014-08-14
  */
	painter.mouseReleased = function (x, y) {
		//x = (x - (painter.bbleft/cvs.width));
		//y = (y - (painter.bbtop/cvs.height));
		painter.image.currentActivity.points.push([x, y]);
		console.log('painter.image.currentActivity.length = '+painter.image.currentActivity.points.length);
		update = true;
	};

	painter.mouseMoved = function (x, y) {
		//x = (x - (painter.bbleft/cvs.width));
		//y = (y - (painter.bbtop/cvs.height));
		painter.image.currentActivity.points.push([x, y]);
		update = true;
	};

	painter.updatePainter = function(_time) {
		if (!painter.bb)
		{
			painter.bb = painter.createBackBuffer(painter.bbwidth, painter.bbheight);
			painter.btx = painter.bb.getContext('2d');
		}
		if (painter.image_src != null)
		{
			var _image = new Image();
			_image.src = painter.image_src;
			painter.btx.drawImage(_image,0,0,painter.bbwidth, painter.bbheight);
		}
    painter.btx.strokeStyle = painter.image.currentActivity.getStrokeStyle();
		painter.btx.lineWidth = painter.image.currentActivity.lineWidth;
		painter.btx.lineCap = 'round';
		painter.btx.lineJoin = 'round';
		painter.btx.beginPath();
		for (var i = 0; i < painter.image.currentActivity.points.length; i++)
		{
			if (i == 0)
			{
				painter.btx.moveTo(painter.image.currentActivity.points[i][0], painter.image.currentActivity.points[i][1]);
			} else {
				painter.btx.lineTo(painter.image.currentActivity.points[i][0], painter.image.currentActivity.points[i][1]);
			}
		}
		painter.btx.stroke();
		painter.btx.closePath();

		if (!pressed && painter.image.currentActivity.points.length > 0)
		{
			painter.image.allActivities.push( painter.image.currentActivity );
			painter.image.currentActivity = new VectorActivity();
			painter.image.currentActivity.init([],'draw',painter.color[0],painter.color[1],painter.color[2],painter.alpha, painter.lineWidth);
    	console.log('updatePainter()');
			ctx.drawImage(painter.bb, painter.bbleft, painter.bbtop, painter.bbwidth, painter.bbheight);
			painter.image_src = painter.bb.toDataURL('painter.image/png');

		} else if (painter.image.currentActivity.points.length > 0) {
			ctx.clearRect(0,0,cvs.width, cvs.height);
			console.log('update->painter');
      ctx.drawImage(painter.bb, painter.bbleft, painter.bbtop, painter.bbwidth, painter.bbheight);
		} else {
			//ctx.clearRect(0,0,cvs.width, cvs.height);
      //ctx.drawImage(painter.bb, painter.bbleft, painter.bbtop, painter.bbwidth, painter.bbheight);
		}
    update = false;
	};

	painter.redraw = function (image) {
		//clearInterval(intervalID);
		painter.bbwidth = painter.image.width * cvs.width;
		painter.bbheight = painter.image.height * cvs.height;
		painter.bb = painter.createBackBuffer(painter.bbwidth, painter.bbheight);
		painter.btx = painter.bb.getContext('2d');

		var ca = false;
		for (var j = painter.image.allActivities.length - 1; j >= 0; j--)
		{
			ca = painter.image.allActivities[j];
			console.log('redraw '+j+' '+ca.points.length);
			painter.btx.clearRect(0,0,painter.bbwidth, painter.bbheight);

			painter.btx.strokeStyle = ca.getStrokeStyle();
			console.log('redraw '+j+' '+ca.points.length+' '+ca.getStrokeStyle());
			painter.btx.lineWidth = ca.lineWidth;
			painter.btx.beginPath();
			for (var i = 0; i < ca.points.length; i++)
			{
				if (i == 0)
				{
					painter.btx.moveTo(ca.points[i][0]*painter.bbwidth, ca.points[i][1]*painter.bbheight);
				} else {
					painter.btx.lineTo(ca.points[i][0]*painter.bbwidth, ca.points[i][1]*painter.bbheight);
				}
			}
			painter.btx.stroke();
			painter.btx.closePath();

			painter.vtx.drawImage(painter.bb, 0, 0,painter.bbwidth, painter.bbheight);
			painter.image_src = painter.ibb.toDataURL('painter.image/png');
		}

		painter.btx.clearRect(0,0,painter.bbwidth, painter.bbheight);

		painter.btx.strokeStyle = painter.image.currentActivity.getStrokeStyle();
		painter.btx.lineWidth = painter.image.currentActivity.lineWidth;
		painter.btx.beginPath();
		for (var i = 0; i < painter.image.currentActivity.points.length; i++)
		{
			if (i == 0)
			{
				painter.btx.moveTo(painter.image.currentActivity.points[i][0]*painter.bbwidth, painter.image.currentActivity.points[i][1]*painter.bbheight);
			} else {
				painter.btx.lineTo(painter.image.currentActivity.points[i][0]*painter.bbwidth, painter.image.currentActivity.points[i][1]*painter.bbheight);
			}
		}
		painter.btx.stroke();
		painter.btx.closePath();
		ctx.drawImage(painter.bb, painter.bbleft, painter.bbtop, painter.bbwidth, painter.bbheight);

		update = true;
	};
	

	painter.init = function() {
		painter.bbtop = cvs.offsetTop;
		painter.bbleft = cvs.offsetLeft;
		painter.bbheight = cvs.height;
		painter.bbwidth = cvs.width;
		painter.bb = null;
		console.log('painter.bb = '+painter.bbtop+','+painter.bbleft+','+painter.bbwidth+','+painter.bbheight);

		painter.image = new VectorLayer();
		painter.image.currentActivity.init([],'draw',0,0,0,0.9,1.5);
		painter.image.width = painter.bbwidth;
		painter.image.height = painter.bbheight;

		if (ctx == null) {
      canvas = getElement('canvas');
			ctx = canvas.getContext('2d');
		}
    //cvs.style.background = '#ccc';
		ctx.clearRect(0,0,cvs.width, cvs.height);

		painter.bb = painter.createBackBuffer(painter.bbwidth, painter.bbheight);//getElement('view');
		painter.btx = painter.bb.getContext('2d');
		painter.image_src = null;
    mode = 'painter';
		update = true;
    requestAnimationFrame(function() {updateCtx(Date.now());});
	};

  var mode = 'normal';
