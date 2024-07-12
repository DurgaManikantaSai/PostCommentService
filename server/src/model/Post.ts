import mongoose , {Schema, Document, model} from "mongoose";

/**
 * Defining the interface for the document 
 */
interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
}


const PostSchema: Schema  = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }                                                                                                                                                                                                                        
});

/**
 * Defining model for post
 */
const Post = model<IPost>('Post',PostSchema);

export {Post, IPost};