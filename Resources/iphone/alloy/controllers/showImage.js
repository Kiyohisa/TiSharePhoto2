function Controller() {
    function showNavBar() {
        Ti.API.info("showNavBar");
        $.pictView.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "showImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.pictView = Ti.UI.createWindow({
        barColor: "#000",
        backgroundColor: "#fff",
        translucent: true,
        id: "pictView"
    });
    $.__views.pictView && $.addTopLevelView($.__views.pictView);
    showNavBar ? $.__views.pictView.addEventListener("click", showNavBar) : __defers["$.__views.pictView!click!showNavBar"] = true;
    $.__views.showImage = Ti.UI.createImageView({
        id: "showImage"
    });
    $.__views.pictView.add($.__views.showImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.showImage.image = args.image;
    __defers["$.__views.pictView!click!showNavBar"] && $.__views.pictView.addEventListener("click", showNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;