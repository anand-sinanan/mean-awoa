var CommentSchema = new Schema({
    id: ObjectId,
    comment: { type: String, required: true },
    likes : Number,
    dislikes: Number,
    owner: [ {type : mongoose.Schema.ObjectId, ref : 'User'} ]
}
, {
         timestamps: true,
         strict: false
     }
   );

//virtuals? can't think of any yet

module.exports = mongoose.model('Comment', CommentSchema);
