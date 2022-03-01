import React, { useState, useContext, useEffect } from 'react';
import { NewsContext } from '../News';
import { ArticleContext } from './Article';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import SmallLoader from '../../Reusable/SmallLoader';


function ArticleModal(props) {

    const fetchNews = useContext(NewsContext);
    const fetchArticle = useContext(ArticleContext);
    const { edited } = props;
    const endpoint = edited ? `https://house-of-hope.herokuapp.com/${edited._id}` : 'https://house-of-hope.herokuapp.com/articles';
    const method = edited ? 'PUT' : 'POST';

    const initialState = {
        title_am: edited ? edited.title_am : '',
        description_am: edited ? edited.description_am : '',
        title_de: edited ? edited.title_de : '',
        description_de: edited ? edited.description_de : '',
        date: edited ? edited.date && edited.date.split('T')[0] : '',
        pictures: edited ? edited.pictures : [],
    }

    const [language, setLanguage] = useState('ARM');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [article, setArticle] = useState(initialState);
    const [files, setFiles] = useState([]);
    const armenian = language === 'ARM';

    const validTitleAm = article.title_am;
    const validTitleDe = article.title_de;
    const validDescriptionAm = article.description_am;
    const validDescriptionDe = article.description_de;
    const validDate = article.date
    const validPictures = files.length > 0;



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(article)
            })
            if (response.ok && files.length !== 0) {
                const data = await response.json();
                const formData = new FormData();
                [...files[0]].forEach(file => formData.append('pictures', file));
                const res = await fetch(`https://house-of-hope.herokuapp.com/articles/${data._id}/pictures`, {
                    method: 'POST',
                    body: formData
                })
                if (res.ok) {
                    props.onHide();
                    setArticle(initialState);
                    setLoading(false)
                    fetchNews();
                    fetchArticle();
                }
            } else if (response.ok && files.length === 0) {
                props.onHide();
                fetchArticle();
                setArticle(initialState);
                setLoading(false)
                fetchNews();

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
    }, [edited])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    New Article
                </Modal.Title>
            </Modal.Header>
            {
                error &&
                <Alert variant="danger" className='d-flex justify-content-center' >
                    <Alert.Heading>oops! You got an error!</Alert.Heading>
                </Alert>
            }
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {
                        armenian
                            ?
                            <>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
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
                                    <Form.Label>Example textarea</Form.Label>
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
                            </>
                            :
                            <>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
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
                                    <Form.Label>Example textarea</Form.Label>
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

                            </>
                    }
                    <Form.Group>
                        <Form.Label>Date Here</Form.Label>
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
                        <Form.Label>{armenian ? "Ավելացնել Նկարներ" : 'Add Images'}</Form.Label>
                        <Form.Control
                            isValid={edited ? '' : validPictures}
                            isInvalid={edited ? '' : !validPictures}
                            required
                            type="file"
                            multiples='true'
                            size="sm"
                            onChange={fileSelectedHandler}
                        />
                    </Form.Group>
                </Form>
                <div className='selected-language'>
                    <span
                        onClick={() => setLanguage('ARM')}
                        className={armenian ? 'selected' : ''}
                    >ՀԱՅ</span>|
                    <span
                        onClick={() => setLanguage('DE')}
                        className={armenian ? '' : 'selected'}
                    >DE</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={(edited ? null : !validPictures) || !validTitleAm || !validTitleDe || !validDescriptionAm || !validDescriptionDe}
                            onClick={handleSubmit}>Submit
                        </Button>

                }
            </Modal.Footer>
        </Modal >
    )
}

export default ArticleModal