import { Router } from 'express';
import { mediaStorage } from '../../utilities/mediaStorage.js';
import { v2 as cloudinary } from 'cloudinary';
import PartnerModel from './schema.js';
import createError from 'http-errors';
import multer from 'multer';


const partnerRouter = Router();


partnerRouter.post('/', async (req, res, next) => {
    try {
        const partner = await PartnerModel.create(req.body);
        res.send(partner);
    } catch (err) {
        next(err);
    }
})

partnerRouter.post("/:id/avatar", multer({ storage: mediaStorage }).single("avatar"), async (req, res, next) => {
    try {
        const partnerId = req.params.id;
        const partner = await PartnerModel.findById(partnerId);
        if (partner) {
            const partnerAvatar = await PartnerModel.findByIdAndUpdate(partnerId, { avatar: { url: req.file.path, public_id: req.file.filename } }, {
                new: true
            })
            res.send(partnerAvatar)
        } else {
            next(createError(404, `Partner with id # ${partnerId} has not been found!`))
        }
    } catch (error) {
        next(error)
    }

})

partnerRouter.post("/:id/delete-avatar", async (req, res, next) => {
    try {
        const { avatar } = await PartnerModel.findById(req.params.id).select('avatar');
        cloudinary.uploader.destroy(avatar.public_id, function (error, result) {
            res.status(200).send({ result, error })
        })
    } catch (error) {
        next(error)
    }
})

partnerRouter.put('/:id', async (req, res, next) => {
    try {
        const partnerId = req.params.id;
        const partner = await PartnerModel.findById(partnerId);
        if (partner) {
            const updatedPartner = await PartnerModel.findByIdAndUpdate(partnerId, req.body, {
                new: true
            })
            res.json(updatedPartner)
        } else {
            next(createError(404, `Partner with id # ${partnerId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

partnerRouter.delete('/:id', async (req, res, next) => {
    try {
        const partnerId = req.params.id;
        const partner = await PartnerModel.findById(partnerId);
        if (partner) {
            await PartnerModel.findByIdAndDelete(partnerId);
            res.send({
                message: `Partner with id # ${partnerId} has been deleted!`
            })
        } else {
            next(createError(404, `Partner with id # ${partnerId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

partnerRouter.get('/', async (req, res, next) => {
    try {
        const partners = await PartnerModel.find();
        res.json(partners);
    } catch (err) {
        next(err);
    }
})

partnerRouter.get('/:id', async (req, res, next) => {
    try {
        const partner = await PartnerModel.findById(req.params.id);
        if (partner) {
            res.json(partner);
        } else {
            next(createError(404, `Partner with id # ${req.params.id} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

export default partnerRouter;