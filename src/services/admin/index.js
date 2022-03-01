import { Router } from 'express';
import AdminModel from './schema.js'
import adminMiddleWare from './security.js';

const adminRouter = Router();


adminRouter.post('/', async (req, res, next) => {
    try {
        const admin = await AdminModel.create(req.body);
        res.send(admin);
    } catch {
        next()
    }
})

adminRouter.post('/login', adminMiddleWare, async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(403).send({ message: 'Forbidden' })
        }
        const { user_name, password } = req.body;
        const admin = await AdminModel.checkCredentials(user_name, password);
        if (!admin) {
            return res.status(403).send({ message: 'Incorrect Credentials' })
        }
        res.send(admin);
    } catch (error) {
        next()
    }
})

export default adminRouter