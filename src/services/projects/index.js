import { Router } from 'express';
import { mediaStorage } from '../../utilities/mediaStorage.js';
import { v2 as cloudinary } from 'cloudinary';
import ProjectModel from './schema.js';
import createError from 'http-errors';
import multer from 'multer';


const projectRouter = Router();


projectRouter.post('/', async (req, res, next) => {
    try {
        const project = await ProjectModel.create(req.body);
        res.json(project);
    } catch (err) {
        next(err);
    }
})

projectRouter.post("/:id/cover", multer({ storage: mediaStorage }).single("cover"), async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await ProjectModel.findById(projectId);
        if (project) {
            const projectCover = await ProjectModel.findByIdAndUpdate(projectId, { cover: { url: req.file.path, public_id: req.file.filename } }, {
                new: true
            })
            res.send(projectCover)
        } else {
            next(createError(404, `Project with id # ${projectId} has not been found!`))
        }
    } catch (error) {
        next(error)
    }
})

projectRouter.post("/:id/delete-cover", async (req, res, next) => {
    try {
        const { cover } = await ProjectModel.findById(req.params.id).select('cover');
        cloudinary.uploader.destroy(cover.public_id, function (error, result) {
            res.status(200).send({ result, error })
        })
    } catch (error) {
        next(error)
    }
})

projectRouter.put('/:id', async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await ProjectModel.findById(projectId);
        if (project) {
            const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, req.body, {
                new: true
            })
            res.json(updatedProject)
        } else {
            next(createError(404, `Project with id # ${projectId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

projectRouter.delete('/:id', async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await ProjectModel.findById(projectId);
        if (project) {
            await ProjectModel.findByIdAndDelete(projectId);
            res.json({
                message: `Project with id # ${projectId} has been deleted!`
            })
        } else {
            next(createError(404, `Project with id # ${projectId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

projectRouter.get('/', async (req, res, next) => {
    try {
        const projects = await ProjectModel.find();
        res.json(projects);
    } catch (err) {
        next(err);
    }
})

projectRouter.get('/:id', async (req, res, next) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            next(createError(404, `Project with id # ${req.params.id} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

export default projectRouter;