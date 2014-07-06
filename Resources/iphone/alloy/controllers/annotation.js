function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "annotation";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.annotation = Ti.Map.createAnnotation({
        animate: true,
        pincolor: Titanium.Map.ANNOTATION_RED,
        rightButton: Ti.UI.iPhone.SystemButton.DISCLOSURE,
        id: "annotation"
    });
    $.__views.annotation && $.addTopLevelView($.__views.annotation);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("annotation args " + args);
    $.annotation.title = args.title || "";
    $.annotation.latitude = args.latitude;
    $.annotation.longitude = args.longitude;
    $.annotation.path = args.path;
    $.annotation.image = args.image;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;