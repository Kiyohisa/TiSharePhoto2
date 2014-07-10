function Controller() {
    function login() {
        var Cloud = require("ti.cloud");
        Cloud.Users.login({
            login: $.username.value,
            password: $.password.value
        }, function(e) {
            if (e.success) {
                alert("login success!");
                var mapView = Alloy.createController("map");
                mapView.move();
            } else alert("Login failed");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginForm = Ti.UI.createView({
        id: "loginForm"
    });
    $.__views.loginForm && $.addTopLevelView($.__views.loginForm);
    $.__views.username = Ti.UI.createTextField({
        top: 50,
        height: 30,
        width: 150,
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "username"
    });
    $.__views.loginForm.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        top: 100,
        height: 30,
        width: 150,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true,
        id: "password"
    });
    $.__views.loginForm.add($.__views.password);
    $.__views.login = Ti.UI.createButton({
        top: 150,
        height: 30,
        width: 75,
        title: "Login",
        id: "login"
    });
    $.__views.loginForm.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;