var args = arguments[0] || {};
$.annotation.title = args.title || '';
$.annotation.latitude = args.latitude;
$.annotation.longitude = args.longitude;
$.annotation.leftView = Ti.UI.createImageView({
			image : args.path,
			width : 32,
			height : 32
	});
$.annotation.path = args.path;
//$.annotation.image = args.image;



