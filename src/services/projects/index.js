import { Router } from 'express';
import ProjectModel from './schema.js';
import { mediaStorage } from '../../utilities/mediaStorage.js';
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
            const projectCover = await ProjectModel.findByIdAndUpdate(projectId, { cover: req.file.path }, {
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