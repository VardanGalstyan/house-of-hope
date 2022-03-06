import { Router } from 'express';
import { mediaStorage } from '../../utilities/mediaStorage.js';
import { v2 as cloudinary } from 'cloudinary';
import EmployeeModel from './schema.js';
import createError from 'http-errors';
import multer from 'multer';


const teamRouter = Router();


teamRouter.post('/', async (req, res, next) => {
    try {
        const employee = await EmployeeModel.create(req.body);
        res.json(employee);
    } catch (err) {
        next(err);
    }
})

teamRouter.post("/:id/avatar", multer({ storage: mediaStorage }).single("avatar"), async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await EmployeeModel.findById(employeeId);
        if (employee) {
            const employeeAvatar = await EmployeeModel.findByIdAndUpdate(employeeId, { avatar: { url: req.file.path, public_id: req.file.filename } }, {
                new: true
            })
            res.send(employeeAvatar)
        } else {
            next(createError(404, `Employee with id # ${employeeId} has not been found!`))
        }
    } catch (error) {
        next(error)
    }
})

teamRouter.post("/:id/delete-avatar", async (req, res, next) => {
    try {
        const { avatar } = await EmployeeModel.findById(req.params.id).select('avatar');
        cloudinary.uploader.destroy(avatar.public_id, function (error, result) {
            res.status(200).send({ result, error })
        })
    } catch (error) {
        next(error)
    }
})

teamRouter.put('/:id', async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await EmployeeModel.findById(employeeId);
        if (employee) {
            const updatedEmployees = await EmployeeModel.findByIdAndUpdate(employeeId, req.body, {
                new: true
            })
            res.json(updatedEmployees)
        } else {
            next(createError(404, `Employee with id # ${employeeId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

teamRouter.delete('/:id', async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await EmployeeModel.findById(employeeId);
        if (employee) {
            await EmployeeModel.findByIdAndDelete(employeeId);
            res.json({
                message: `Employee with id # ${employeeId} has been deleted!`
            })
        } else {
            next(createError(404, `Employee with id # ${employeeId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

teamRouter.get('/', async (req, res, next) => {
    try {
        const employees = await EmployeeModel.find();
        res.json(employees);
    } catch (err) {
        next(err);
    }
})

teamRouter.get('/:id', async (req, res, next) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            next(createError(404, `Employee with id # ${req.params.id} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

export default teamRouter;