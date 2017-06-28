var AlbumSchema = new Schema({
    id: ObjectId,
    title: { type: String, required: true },
    description: String,
    likes : Number,
    dislikes: Number,
    owner: [ {type : mongoose.Schema.ObjectId, ref : 'User'} ],
    images: [ {type : mongoose.Schema.ObjectId, ref : 'Image'} ]
}, {
         timestamps: true,
         strict: false
     }
   );

//virtuals? can't think of any yet

module.exports = mongoose.model('Album', AlbumSchema);
