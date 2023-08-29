import { Schema, model } from "mongoose";

enum CATEGORY {
    CONSTRUCTION = 'construction',
    DESIGN = 'design',
    IMPORT = 'import',
    EXPORT = 'export',
    PROJECT = 'project',
}

const projectSchema = new Schema({
    projectname: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    description: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    category: {
        type: String,
        default : CATEGORY.PROJECT,
    },
    images: [
        {
            type: String,
            trim: true,
        required: true,
        },
    ],
    createdAt: {
        type: Date,
        default : Date.now(),
    },
});

const Project = model('Project', projectSchema);

export default Project;