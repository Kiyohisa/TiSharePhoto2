var args = arguments[0] || {};

function takePhoto(){
	Ti.Media.openPhotoGallery({	
	//Ti.Media.showCamera({
		
		success:function(e){
			var cropRect = e.cropRect;
			var image = e.media;
			if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
            	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
            	Ti.Geolocation.getCurrentPosition(
            		function(evt){
            			var now = new Date().getTime();
	 					Ti.API.info("now " +now);
	 					var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory
	 						,String.format('%d-%d', now, Math.floor(Math.random() * 1000)));
	 					file.write(image);

	 	 				var savePhoto = {
						    path: file.nativePath,
						    latitude: evt.coords.latitude,
						    longitude: evt.coords.longitude,
	 					};
	 					var photo = Alloy.createModel("photo", savePhoto);
	 					photo.save();
						//Alloy.Collections.photo.add(photo);
						Ti.App.fireEvent('app:update', photo);
            		}
            	);
     		}else{
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function(){
			
		},
		error:function(e){
				// create alert
			var a = Ti.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (e.code == Ti.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + e.code);
			}
	
			// show alert
			a.show();		
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]		
	});
	
}
