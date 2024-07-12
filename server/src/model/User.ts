
import mongoose, {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}


const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    createdAt: {type: Date, default: Date.now}
})


UserSchema.pre<IUser> ('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    try{
        const hashedPassword = await bcrypt.hash(user.password,10);
        user.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err as Error);
    }
});

const User = model<IUser>('User', UserSchema);

export {User,IUser};