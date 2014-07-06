exports.definition = {
    config: {
        columns: {
            path: "text",
            latitude: "text",
            longitude: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "photo"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("photo", exports.definition, []);

collection = Alloy.C("photo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;