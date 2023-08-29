import { Schema, model } from "mongoose";

enum Role {
    OWNER = 'owner',
    ADMIN = 'admin',
    VIEWER = 'viewer',
}

const userSchema = new Schema({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        default : Role.VIEWER
    },
    createdAt: {
        type: Date,
        default : Date.now(),
    },
});

const User = model('User', userSchema);

export default User;