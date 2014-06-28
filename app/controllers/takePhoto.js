var args = arguments[0] || {};

var win = Ti.UI.currentWindow;
function takePhoto(){
	//Ti.Media.openPhotoGallery({	
	Ti.Media.showCamera({
		
		success:function(e){
			var cropRect = e.cropRect;
			var image = e.media;
			if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				
				// カメラで撮った画像を表示
				var imageView = Ti.UI.createImageView({
					width : win.width,
					height : win.height,
					image : e.media
				});
				win.add(imageView);
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
