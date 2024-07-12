import mongoose, { model, Schema, Document } from 'mongoose';


interface IComment extends Document {
    postId: mongoose.Types.ObjectId;
    content: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}


const CommentSchema: Schema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});


const Comment = model<IComment>('Comment', CommentSchema);

export {Comment, IComment};