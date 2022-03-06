import { Router } from 'express';
import { mediaStorage } from '../../utilities/mediaStorage.js';
import { v2 as cloudinary } from 'cloudinary';
import ArticleModel from './schema.js';
import createError from 'http-errors';
import multer from 'multer';
import q2m from 'query-to-mongo';


const articleRouter = Router();


articleRouter.post('/', async (req, res, next) => {
    try {
        const article = await ArticleModel.create(req.body);
        const savedArticle = await article.save(
            function (err, savedArticle) {
                if (err) return next(err);
                res.status(201).json(savedArticle);
            }
        );
    } catch (err) {
        next(err);
    }
})

articleRouter.post("/:id/pictures", multer({ storage: mediaStorage }).array("pictures", 10), async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const article = await ArticleModel.findById(articleId);
        if (article) {
            const articleAvatar = await ArticleModel.findByIdAndUpdate(articleId, { pictures: req.files.map(file => ({ url: file.path, public_id: file.filename })) }, {
                new: true
            })
            res.send(articleAvatar)
        } else {
            next(createError(404, `Article with id # ${articleId} has not been found!`))
        }
    } catch (error) {
        next(error)
    }
})

articleRouter.post("/:id/delete-pictures", async (req, res, next) => {
    try {
        const { pictures } = await ArticleModel.findById(req.params.id).select('pictures');
        if (pictures.length === 0) {
            return res.status(404).send({ result: 'No images uploaded!' })
        } else {
            pictures.forEach(picture => cloudinary.uploader.destroy(picture.public_id));
            res.status(200).send({ result: 'Pictures were successfully removed' })
        }
    } catch (error) {
        next(error)
    }
})

articleRouter.put('/:id', async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const article = await ArticleModel.findById(articleId);
        if (article) {
            const updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, req.body, {
                new: true
            })
            res.send(updatedArticle)
        } else {
            next(createError(404, `Article with id # ${articleId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

articleRouter.delete('/:id', async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const article = await ArticleModel.findById(articleId);
        if (article) {
            await ArticleModel.findByIdAndDelete(articleId);
            res.json({
                message: `Article with id # ${articleId} has been deleted!`
            })
        } else {
            next(createError(404, `Article with id # ${articleId} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

articleRouter.get('/', async (req, res, next) => {

    try {
        const query = q2m(req.query);
        const total = await ArticleModel.countDocuments(query.criteria);
        const articles = await ArticleModel
            .find(query.criteria, query.options.fields)
            .limit(query.options.limit)
            .skip(query.options.skip)
            .sort(query.options.sort);
        res.send({ links: query.links("/articles", total), total, articles, pageTotal: Math.ceil(total / query.options.limit) });
    } catch (err) {
        next(err);
    }
})

articleRouter.get('/:id', async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if (article) {
            res.json(article);
        } else {
            next(createError(404, `Article with id # ${req.params.id} has not been found!`))
        }
    } catch (err) {
        next(err);
    }
})

export default articleRouter;