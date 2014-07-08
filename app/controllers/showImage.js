var args = arguments[0] || {};
$.showImage.image = args.image;

function showNavBar(){
	Ti.API.info("showNavBar");
	$.pictView.close();
	//Titanium.UI.currentWindow.showNavBar();
}