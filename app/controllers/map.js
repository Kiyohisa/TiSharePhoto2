//$.map.show();
exports.move = function(){
	//alert('Moved!');
	return $.mapWindow.open();
};

function report(evt) {
    Ti.API.info("Annotation clicked");
}

var _addAnnotation = function() {

	var cloud = require("ti.cloud");
	cloud.Places.query({
		page:1,
		per_page:20
	},function(e){
		var data, i, place, result,marker;
		if(e.success){
			i=0;
			while(i < e.places.length){
				place = e.places[i];
				marker = Alloy.createController('annotation', {
					latitude : place.latitude,
					longitude : place.longitude,
					//path : place.photo.urls.thumb_100,
					path : place.photo.urls.medium_640,
					rightButton : (Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "light_more.png"),
					title : "test"
					//image : thumbnailImageView.toImage()
				});
				$.map.addAnnotation(marker.getView());
				i++;
			}
		}
	});
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
	// var photos = Alloy.Collections.photo;
	// photos.fetch();
	// Ti.API.info(photos.fetch());
	// photos.map(_addAnnotation);
	_addAnnotation();

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
		}
		
	});	
});

Ti.App.addEventListener('app:update', function(photo) {
	//_addAnnotation(photo);
	/*
	var cloud = require("ti.cloud");
	cloud.Places.show({
		place_id:place.id
	},function(e){
	*/
		var addPlace,marker;
//		if(e.success){
//			addPlace = e.places[0];
			marker = Alloy.createController('annotation', {
					latitude : photo.attributes.latitude,
					longitude : photo.attributes.longitude,
					//path : place.photo.urls.thumb_100,
					path : photo.attributes.path,
					rightButton : (Ti.Platform.osname == "iphone" ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "light_more.png"),
					title : "test"
					//image : thumbnailImageView.toImage()
			});
			$.map.addAnnotation(marker.getView());
	//}
		
	//});
	
});