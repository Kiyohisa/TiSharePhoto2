var args = arguments[0] || {};
Ti.API.info("annotation args " +args);
$.annotation.title = args.title || '';
$.annotation.latitude = args.latitude;
$.annotation.longitude = args.longitude;
$.annotation.path = args.path;
//$.annotation.leftView = args.leftView;
$.annotation.image = args.image;