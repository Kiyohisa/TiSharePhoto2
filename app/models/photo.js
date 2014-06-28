exports.definition = {
	config: {
		columns: {
		    "path": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "photo"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};