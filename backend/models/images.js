var ImageSchema = new Schema({
    id: ObjectId,
    title: { type: Scomments required: true },
    description: String,
    tags: [String],
    likes : Number,
    dislikes: Number,
    owner: {type : mongoose.Schema.ObjectId, ref : 'User'},
    comments: [ {type : mongoose.Schema.ObjectId, ref : 'Image'} ]
}, {
         timestamps: true,
         strict: false
     }
);

//virtuals? can't think of any yet

module.exports = mongoose.model('Image', ImageSchema);
