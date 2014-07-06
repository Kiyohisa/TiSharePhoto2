function showMap(){
		
}

var _addAnnotation = function(photo) {
//exports.setAnnotation = function(photo) {
	//Ti.API.info(photo.get('path'));
		var imgBlob = Ti.UI.createImageView({
		    image: photo.attributes.path,
		    borderColor:'#fff',
		    borderWidth:12,
		    hires: true
		}).toImage();
	
	  var thumbnailImageView = Ti.UI.createImageView({
	    image: imgBlob,
	    width:64,
	    height:64,
	    borderColor:'#999',
	    borderWidth:1,
	    hires: true
	  });

	var annotation = Alloy.createController('annotation', {
		latitude:photo.attributes.latitude
		,longitude:photo.attributes.longitude
		,leftView: Ti.UI.createImageView({image: photo.attributes.path, width:32, height:32})
		,path: photo.attributes.path
		,image: thumbnailImageView.toImage()
	});
	$.map.addAnnotation(annotation.getView());
};

// 現在位置を設定
Ti.Geolocation.purpose = 'Determine Current Location';
Ti.Geolocation.getCurrentPosition(
	function(e) {
		if(!e.success || e.error){
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
		// $.map.addAnnotation(currentPos);
		// annotationを設定
		var photos = Alloy.Collections.photo;
//		Ti.API.info({photos: photos});
		photos.fetch();
		Ti.API.info(photos.fetch());
		photos.map(_addAnnotation);
//		photos.map($.map.setAnnotation);
		
		$.map.show();
		$.map.setLocation({
			latitude : latitude,
			longitude : longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01					
		});
	}
);

Ti.App.addEventListener('app:update',function(photo){
 	_addAnnotation(photo);
});

//$.index.open();