function Controller() {
    function takePhoto() {
        Ti.Media.showCamera({
            success: function(e) {
                e.cropRect;
                e.media;
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    var imageView = Ti.UI.createImageView({
                        width: win.width,
                        height: win.height,
                        image: e.media
                    });
                    win.add(imageView);
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(e) {
                var a = Ti.UI.createAlertDialog({
                    title: "Camera"
                });
                e.code == Ti.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + e.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "takePhoto";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.takePhoto = Ti.UI.createView({
        backgroundColor: "#800",
        height: "50dp",
        top: 0,
        id: "takePhoto"
    });
    $.__views.takePhoto && $.addTopLevelView($.__views.takePhoto);
    $.__views.take = Ti.UI.createButton({
        font: {
            fontSize: "20dp",
            fontWeight: "bold"
        },
        top: "5dp",
        height: "40dp",
        width: "40dp",
        right: "5dp",
        id: "take",
        title: "take"
    });
    $.__views.takePhoto.add($.__views.take);
    takePhoto ? $.__views.take.addEventListener("click", takePhoto) : __defers["$.__views.take!click!takePhoto"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var win = Ti.UI.currentWindow;
    __defers["$.__views.take!click!takePhoto"] && $.__views.take.addEventListener("click", takePhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;