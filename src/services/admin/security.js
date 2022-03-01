import AdminModel from './schema.js'


const AdminMiddleWare = async (req, res, next) => {
    try {
        const encodedCredentials = req.headers.authorization.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
        const [user_name, password] = decodedCredentials.split(':');
        const admin = await AdminModel.checkCredentials(user_name, password);
        if (admin) {
            req.admin = admin;
            next();
        } else {
            res.status(403).send({ message: 'The user is not Authorized!' })
            next()
        }
    } catch (error) {
        next(error)
    }
}

export default AdminMiddleWare;