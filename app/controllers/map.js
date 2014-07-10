//$.map.show();
exports.move = function(){
	//alert('Moved!');
	return $.mapWindow.open();
};

function report(evt) {
    Ti.API.info("Annotation clicked");
}

var _addAnnotation = function(photo) {
/*
	var imgBlob = Ti.UI.createImageView({
		image : photo.attributes.path,
		borderColor : '#fff',
		borderWidth : 12,
		hires : true
	}).toImage();

	var thumbnailImageView = Ti.UI.createImageView({
		image : imgBlob,
		width : 64,
		height : 64,
		borderColor : '#999',
		borderWidth : 1,
		hires : true
	});
*/
	var annotation = Alloy.createController('annotation', {
		latitude : photo.attributes.latitude,
		longitude : photo.attributes.longitude,
		// leftView : Ti.UI.createImageView({
			// image : photo.attributes.path,
			// width : 32,
			// height : 32
		// }),
		path : photo.attributes.path,
		rightButton : (Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "light_more.png"),
		title : "test"
		//image : thumbnailImageView.toImage()
	});
	$.map.addAnnotation(annotation.getView());
};

// 現在位置を設定
Ti.Geolocation.purpose = 'Determine Current Location';
Ti.Geolocation.getCurrentPosition(function(e) {
	if (!e.success || e.error) {
		alert('It was not possible to get the location information!');
		return;
	}
	// 現在地をセット
	latitude = e.coords.latitude;
	longitude = e.coords.longitude;
	// 現在地を動的に表示する
	var currentPos = Ti.Map.createAnnotation({
		latitude : latitude,
		longitude : longitude,
		pincolor : Ti.Map.ANNOTATION_RED,
		animate : true
	});
	var photos = Alloy.Collections.photo;
	photos.fetch();
	Ti.API.info(photos.fetch());
	photos.map(_addAnnotation);

	$.map.show();
	$.map.setLocation({
		latitude : latitude,
		longitude : longitude,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	});

	$.map.addEventListener('click', function(event){
		 Ti.API.info("Annotation clicked, path: ");
 	
		if (event.annotation && event.clicksource == "rightButton") {
			Ti.API.info("annotation click");
			var imageView = Alloy.createController('showImage', {
				image : event.annotation.path
			});
			imageView.getView().open();
			//index = Alloy.createController("index");
			//index.getView("showMap").open(imageView.getView());
		}
		
	});	
});

Ti.App.addEventListener('app:update', function(photo) {
	_addAnnotation(photo);
});