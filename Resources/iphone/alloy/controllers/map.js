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
        title: "Current Position",
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
        $.map.show();
        $.map.setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;