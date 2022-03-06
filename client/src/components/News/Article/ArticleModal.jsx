import { useState, useContext, useEffect } from 'react';
import { NewsContext } from '../News';
import { ArticleContext } from './Article';
import { languageContext } from '../../../App';
import { Modal, Form, Button } from 'react-bootstrap';
import { addNewsDateLanguage, addNewsTitleLanguage } from '../content';
import { handleFormCloseLanguage, handleFormConfirmLanguage, handleFormContentLanguage, handleFormImageLanguage, handleFormNameLanguage } from '../../projects/content';
import SmallLoader from '../../Reusable/SmallLoader';
import Error from '../../Reusable/Error';


function ArticleModal({ edited, ...props }) {

    const fetchNews = useContext(NewsContext);
    const fetchArticle = useContext(ArticleContext);
    const lang = useContext(languageContext).language

    const endpoint = edited ? `${process.env.REACT_APP_SERVER}/articles/${edited._id}` : `${process.env.REACT_APP_SERVER}/articles`;
    const method = edited ? 'PUT' : 'POST';

    const initialState = {
        title_am: edited ? edited.title_am : '',
        description_am: edited ? edited.description_am : '',
        title_de: edited ? edited.title_de : '',
        description_de: edited ? edited.description_de : '',
        title_en: edited ? edited.title_en : '',
        description_en: edited ? edited.description_en : '',
        date: edited ? edited.date && edited.date.split('T')[0] : '',
        pictures: edited ? edited.pictures : [],
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [article, setArticle] = useState(initialState);
    const [files, setFiles] = useState([]);

    const [language, setLanguage] = useState('ARM');
    const arm = language === 'ARM';
    const de = language === 'DE';
    const en = language === 'EN';

    const validTitleAm = article.title_am;
    const validTitleDe = article.title_de;
    const validTitleEn = article.title_en;
    const validDescriptionAm = article.description_am;
    const validDescriptionDe = article.description_de;
    const validDescriptionEn = article.description_en;
    const validDate = article.date
    const validPictures = files.length > 0;



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const articleApi = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(article)
            })
            if (articleApi.ok && files.length !== 0) {
                const data = await articleApi.json();
                const formData = new FormData();
                [...files[0]].forEach(file => formData.append('pictures', file));
                (article.pictures.length > 0) && await fetch(`${process.env.REACT_APP_SERVER}/articles/${data._id}/delete-pictures`, { method: 'POST' })
                const addCloudinary = await fetch(`${process.env.REACT_APP_SERVER}/articles/${data._id}/pictures`, { method: 'POST', body: formData })
                if (addCloudinary.ok) {
                    setLoading(false)
                    edited && fetchArticle();
                    !edited && fetchNews();
                    props.onHide();
                    !edited && setArticle(initialState);
                }
            } else if (articleApi.ok && files.length === 0) {
                setLoading(false)
                !edited && fetchNews();
                edited && fetchArticle();
                props.onHide();
                !edited && setArticle(initialState);

            } else {
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            setLoading(false)
            setError(true);
        }
    }

    const handleClose = () => {
        setArticle(initialState);
        setFiles([]);
        props.onHide();
        setError(false);
        setLoading(false);
    }

    const fileSelectedHandler = (e) => {
        setFiles([...files, e.target.files]);
    }

    useEffect(() => {
        setArticle(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edited])

    return (
        <Modal  {...props} size="lg" centered  >
            <Modal.Header closeButton> <Modal.Title> {addNewsTitleLanguage(lang)} </Modal.Title> </Modal.Header>
            {error && <Error />}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {
                        arm ?
                            <>
                                <Form.Group>
                                    <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                    <Form.Control
                                        isValid={validTitleAm}
                                        isInvalid={!validTitleAm}
                                        required
                                        type="text"
                                        placeholder="Enter the Title"
                                        value={article.title_am}
                                        onChange={(e) => setArticle({ ...article, title_am: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                    <Form.Control
                                        isValid={validDescriptionAm}
                                        isInvalid={!validDescriptionAm}
                                        required
                                        as="textarea"
                                        rows={3}
                                        value={article.description_am}
                                        onChange={(e) => setArticle({ ...article, description_am: e.target.value })}
                                    />
                                </Form.Group>
                            </> :
                            de ?
                                <>
                                    <Form.Group>
                                        <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                        <Form.Control
                                            isValid={validTitleDe}
                                            isInvalid={!validTitleDe}
                                            required
                                            type="text"
                                            placeholder="Enter the Title"
                                            value={article.title_de}
                                            onChange={(e) => setArticle({ ...article, title_de: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                        <Form.Control
                                            isValid={validDescriptionDe}
                                            isInvalid={!validDescriptionDe}
                                            required
                                            as="textarea"
                                            rows={3}
                                            value={article.description_de}
                                            onChange={(e) => setArticle({ ...article, description_de: e.target.value })}
                                        />
                                    </Form.Group>

                                </> :
                                en ?
                                    <>
                                        <Form.Group>
                                            <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                            <Form.Control
                                                isValid={validTitleEn}
                                                isInvalid={!validTitleEn}
                                                required
                                                type="text"
                                                placeholder="Enter the Title"
                                                value={article.title_en}
                                                onChange={(e) => setArticle({ ...article, title_en: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                            <Form.Control
                                                isValid={validDescriptionEn}
                                                isInvalid={!validDescriptionEn}
                                                required
                                                as="textarea"
                                                rows={3}
                                                value={article.description_en}
                                                onChange={(e) => setArticle({ ...article, description_en: e.target.value })}
                                            />
                                        </Form.Group>
                                    </> : null
                    }
                    <Form.Group>
                        <Form.Label>{addNewsDateLanguage(lang)}</Form.Label>
                        <Form.Control
                            isValid={validDate}
                            isInvalid={!validDate}
                            required
                            type='date'
                            rows={3}
                            value={article.date}
                            onChange={(e) => setArticle({ ...article, date: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>{handleFormImageLanguage(lang)}</Form.Label>
                        <Form.Control
                            isValid={edited ? '' : validPictures}
                            isInvalid={edited ? '' : !validPictures}
                            required
                            type="file"
                            multiple
                            size="sm"
                            onChange={fileSelectedHandler}
                        />
                    </Form.Group>
                </Form>
                <div className='selected-language'>
                    <span
                        onClick={() => setLanguage('ARM')}
                        className={arm ? 'selected' : ''}
                    >ՀԱՅ</span>|
                    <span
                        onClick={() => setLanguage('DE')}
                        className={de ? 'selected' : ''}
                    >DE</span> |
                    <span
                        onClick={() => setLanguage('EN')}
                        className={en ? 'selected' : ''}
                    >EN</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>{handleFormCloseLanguage(lang)}</button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={(edited ? null : !validPictures) || !validTitleAm || !validTitleDe || !validDescriptionAm || !validDescriptionDe}
                            onClick={handleSubmit}>{handleFormConfirmLanguage(lang)}
                        </Button>

                }
            </Modal.Footer>
        </Modal >
    )
}

export default ArticleModal