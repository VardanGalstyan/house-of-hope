import './style.css'
import { useState, useEffect, useContext, createContext } from 'react';
import { languageContext } from '../../../App';
import { Container, Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import { adminContext } from '../../../App';
import ArticleShare from './ArticleShare';
import DeleteArticleModal from './DeleteArticleModal'
import Error from '../../Reusable/Error';
import Loader from '../../Reusable/Loader';
import ArticleModal from './ArticleModal';

export const ArticleContext = createContext();

function Article() {

    const { language } = useContext(languageContext);
    const { isAdmin } = useContext(adminContext);
    const { id } = useParams();
    const am = language === 'am',
    const en = language === 'en',
    const de = language === 'de';

    const [modalShow, setModalShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER}/articles/${id}`)
            if (response.ok) {
                const data = await response.json();
                setArticle(data);
                setLoading(false);
            } else {
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetchArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDate = article.createdAt && article.createdAt.split('T')[0];
    const date = new Date(getDate);
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return (
        <>
            {
                error ? <Error /> :
                    loading ? <Loader /> :
                        <Container fluid className='article'>
                            <div className='article-header'>
                                <Carousel>
                                    {
                                        article.pictures && article.pictures.map((picture, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={picture.url}
                                                    alt={`Slide ${index + 1}`}
                                                />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                                <span className='article-date'> {`${day}, ${month} ${year}`}</span>
                            </div>
                            {
                                isAdmin &&
                                <div className='main-post-admin-tools'>
                                    <span><RiEdit2Fill onClick={() => setModalShow(true)} /></span>
                                    <span><RiDeleteBin6Fill onClick={() => setDeleteModal(true)} /></span>
                                </div>
                            }
                            <div className='article-body'>
                                <h1>{am ? article.title_am : de ? article.title_de : en ? article.title_en : null}</h1>
                                <p>{am ? article.description_am : de ? article.description_de : en ? article.description_en : null}</p>
                            </div>
                            <ArticleContext.Provider value={fetchArticle}>
                                <ArticleModal show={modalShow} onHide={() => setModalShow(false)} edited={article} />
                                <DeleteArticleModal show={deleteModal} onHide={() => setDeleteModal(false)} article={article} />
                            </ArticleContext.Provider>
                            <ArticleShare />
                        </Container >
            }
        </>
    );
}

export default Article;
