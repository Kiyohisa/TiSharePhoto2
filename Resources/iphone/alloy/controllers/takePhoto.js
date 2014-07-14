function Controller() {
    function takePhoto() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                e.cropRect;
                var image = e.media;
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
                    Ti.Geolocation.getCurrentPosition(function(evt) {
                        var now = new Date().getTime();
                        Ti.API.info("now " + now);
                        var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, String.format("%d-%d", now, Math.floor(1e3 * Math.random())));
                        file.write(image);
                        var savePhoto = {
                            path: file.nativePath,
                            latitude: evt.coords.latitude,
                            longitude: evt.coords.longitude
                        };
                        var photo = Alloy.createModel("photo", savePhoto);
                        photo.save();
                        var place;
                        Cloud.Places.create({
                            name: "test",
                            latitude: evt.coords.latitude,
                            longitude: evt.coords.longitude,
                            photo: image
                        }, function(e) {
                            if (e.success) {
                                place = e.places[0];
                                alert("Created!");
                            } else error(e);
                        });
                        Ti.App.fireEvent("app:update", photo);
                    });
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
    var Cloud = require("ti.cloud");
    __defers["$.__views.take!click!takePhoto"] && $.__views.take.addEventListener("click", takePhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;