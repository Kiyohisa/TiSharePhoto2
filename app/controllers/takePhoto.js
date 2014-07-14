var args = arguments[0] || {};
var Cloud = require('ti.cloud');

function takePhoto(){
	Ti.Media.openPhotoGallery({	
	//Ti.Media.showCamera({
		
		success:function(e){
			var cropRect = e.cropRect;
			var image = e.media;
			//var savePhoto;
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
						
						var place;
						Cloud.Places.create({
							name: "test",
						    latitude: evt.coords.latitude,
						    longitude: evt.coords.longitude,
						    photo: image
						}, function(e){
			            	if(e.success) {
			            		place = e.places[0];
                    			alert('Created!');
//								Ti.App.fireEvent('app:update', place);					
                    			
                			} else {
                    			error(e);
                			}				
						});
						Ti.App.fireEvent('app:update', photo);					
            		}
            	);
     		}else{
				alert("got the wrong type back ="+event.mediaType);
			}
			// 写真アップロード
			/*
			Cloud.Photos.create({
                 photo: image,
                 //coordinates: [-122.1, 37.1]
             }, function (e) {
                 if (e.success) {
                    var photo = e.photos[0];
                     alert('Success:\\n' +
                            'id: ' + photo.id + '\\n' +
                            'filename: ' + photo.filename + '\\n' +
                            'size: ' + photo.size,
                            'updated_at: ' + photo.updated_at);
                  } else {
                     alert('Error:\\n' +
                        ((e.error && e.message) || JSON.stringify(e)));
                  }
                });
                */
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
