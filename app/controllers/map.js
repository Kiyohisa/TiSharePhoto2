function showMap(){
		
}

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
		$.map.show();
		$.map.setLocation({
			latitude : latitude,
			longitude : longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01					
		});
	}
);
//$.index.open();
/*
exports.addAnnotation = function(geodata) {
	var annotation = Alloy.createController('annotation', {
		title: geodata.title,
		latitude: geodata.coords.latitude,
		longitude: geodata.coords.longitude
	});
	$.map.addAnnotation(annotation.getView());
	$.map.setLocation({
		latitude: geodata.coords.latitude,
		longitude: geodata.coords.longitude,
		latitudeDelta: 1,
		longitudeDelta: 1
	});
};
*/