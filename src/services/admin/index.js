import { Router } from 'express';
import AdminModel from './schema.js'
import createError from 'http-errors';

const adminRouter = Router();


adminRouter.post('/', async (req, res, next) => {
    try {
        const admin = await AdminModel.create(req.body);

        res.send(admin);
    } catch {
        next()
    }
})

adminRouter.post('/login', async (req, res, next) => {
    try {
        const { user_name, password } = req.body;
        const admin = await AdminModel.checkCredentials(user_name, password);
        if (admin) {
            res.send(admin);
        } else {
            next(createError(404, 'Credentials are incorrect!'))
        }
    } catch (error) {
        next()
    }
})

export default adminRouter