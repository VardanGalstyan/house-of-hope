import './style.css'
import { useState, useEffect, useContext, createContext } from 'react';
import { languageContext } from '../../../App';
import { Container, Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import ArticleShare from './ArticleShare';
import DeleteArticleModal from './DeleteArticleModal'
import Error from '../../Reusable/Error';
import Loader from '../../Reusable/Loader';
import ArticleModal from './ArticleModal';

export const ArticleContext = createContext();

function Article() {



    const { language } = useContext(languageContext);
    const { id } = useParams();

    const [modalShow, setModalShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3005/articles/${id}`)
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
                                                    src={picture}
                                                    alt={`Slide ${index + 1}`}
                                                />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                                <span className='article-date'> {`${day}, ${month} ${year}`}</span>
                            </div>
                            {
                                <div className='main-post-admin-tools'>
                                    <span><RiEdit2Fill onClick={() => setModalShow(true)} /></span>
                                    <span><RiDeleteBin6Fill onClick={() => setDeleteModal(true)} /></span>
                                </div>
                            }
                            <div className='article-body'>
                                <h1>{language === 'am' ? article.title_am : article.title_de}</h1>
                                <p>{language === 'am' ? article.title_am : article.title_de}</p>
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