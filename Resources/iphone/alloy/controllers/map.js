function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.mapWindow = Ti.UI.createWindow({
        id: "mapWindow",
        title: "現在地"
    });
    $.__views.mapWindow && $.addTopLevelView($.__views.mapWindow);
    $.__views.takePhoto = Alloy.createController("takePhoto", {
        id: "takePhoto",
        __parentSymbol: $.__views.mapWindow
    });
    $.__views.takePhoto.setParent($.__views.mapWindow);
    var __alloyId0 = [];
    $.__views.__alloyId1 = Alloy.createController("annotation", {
        title: "Photo position",
        id: "__alloyId1",
        __parentSymbol: __parentSymbol
    });
    __alloyId0.push($.__views.__alloyId1.getViewEx({
        recurse: true
    }));
    $.__views.map = Ti.Map.createView({
        top: "50dp",
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: __alloyId0,
        id: "map",
        ns: Ti.Map,
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.mapWindow.add($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.move = function() {
        return $.mapWindow.open();
    };
    var _addAnnotation = function() {
        var cloud = require("ti.cloud");
        cloud.Places.query({
            page: 1,
            per_page: 20
        }, function(e) {
            var i, place, marker;
            if (e.success) {
                i = 0;
                while (e.places.length > i) {
                    place = e.places[i];
                    marker = Alloy.createController("annotation", {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        path: place.photo.urls.medium_640,
                        rightButton: "iphone" == Ti.Platform.osname ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "light_more.png",
                        title: "test"
                    });
                    $.map.addAnnotation(marker.getView());
                    i++;
                }
            }
        });
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
        _addAnnotation();
        $.map.show();
        $.map.setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        });
        $.map.addEventListener("click", function(event) {
            Ti.API.info("Annotation clicked, path: ");
            if (event.annotation && "rightButton" == event.clicksource) {
                Ti.API.info("annotation click");
                var imageView = Alloy.createController("showImage", {
                    image: event.annotation.path
                });
                imageView.getView().open();
            }
        });
    });
    Ti.App.addEventListener("app:update", function(photo) {
        var marker;
        marker = Alloy.createController("annotation", {
            latitude: photo.attributes.latitude,
            longitude: photo.attributes.longitude,
            path: photo.attributes.path,
            rightButton: "iphone" == Ti.Platform.osname ? Ti.UI.iPhone.SystemButton.DISCLOSURE : "light_more.png",
            title: "test"
        });
        $.map.addAnnotation(marker.getView());
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;