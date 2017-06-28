module.exports = function(mongoose){
    return [{
        name: {type: String, required: true},
        description: {type: String},
        rating: {type: String},
        type: {type: String},
        tags: [String],
        path: {type: String}
    }, {
        timestamps: true,
        strict: false
    }]
};
