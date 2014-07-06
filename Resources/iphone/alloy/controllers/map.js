function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId6 = [];
    $.__views.__alloyId7 = Alloy.createController("annotation", {
        title: "Photo position",
        id: "__alloyId7",
        __parentSymbol: __parentSymbol
    });
    __alloyId6.push($.__views.__alloyId7.getViewEx({
        recurse: true
    }));
    $.__views.map = Ti.Map.createView({
        top: "50dp",
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: __alloyId6,
        ns: Ti.Map,
        id: "map",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _addAnnotation = function(photo) {
        var imgBlob = Ti.UI.createImageView({
            image: photo.attributes.path,
            borderColor: "#fff",
            borderWidth: 12,
            hires: true
        }).toImage();
        var thumbnailImageView = Ti.UI.createImageView({
            image: imgBlob,
            width: 64,
            height: 64,
            borderColor: "#999",
            borderWidth: 1,
            hires: true
        });
        var annotation = Alloy.createController("annotation", {
            latitude: photo.attributes.latitude,
            longitude: photo.attributes.longitude,
            leftView: Ti.UI.createImageView({
                image: photo.attributes.path,
                width: 32,
                height: 32
            }),
            path: photo.attributes.path,
            image: thumbnailImageView.toImage()
        });
        $.map.addAnnotation(annotation.getView());
    };
    Ti.Geolocation.purpose = "Determine Current Location";
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (!e.success || e.error) {
            alert("It was not possible to get the location information!");
            return;
        }
        latitude = e.coords.latitude;
        longitude = e.coords.longitude;
        Ti.Map.createAnnotation({
            latitude: latitude,
            longitude: longitude,
            pincolor: Ti.Map.ANNOTATION_RED,
            animate: true
        });
        var photos = Alloy.Collections.photo;
        photos.fetch();
        Ti.API.info(photos.fetch());
        photos.map(_addAnnotation);
        $.map.show();
        $.map.setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        });
    });
    Ti.App.addEventListener("app:update", function(photo) {
        _addAnnotation(photo);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;