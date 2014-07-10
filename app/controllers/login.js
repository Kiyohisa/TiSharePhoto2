var args = arguments[0] || {};

function login(){
	var Cloud = require('ti.cloud'); 
	Cloud.Users.login({
		login : $.username.value,
		password : $.password.value
	}, function  (e) {
	  if(e.success) {
	  	alert('login success!');
	  	var mapView = Alloy.createController('map');
	  	mapView.move();
	  }else{
	  	alert('Login failed');
	  }
	});
}
