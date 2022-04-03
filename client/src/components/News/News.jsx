import './style.css';
import { useState, useContext, useEffect, createContext, useCallback } from 'react';
import { addNewsTitleLanguage } from './content';
import { languageContext, adminContext } from '../../App';
import { Container } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';
import { Watch } from 'react-loader-spinner';
import NewsItem from './NewsItem';
import Headers from '../Reusable/Headers';
import ArticleModal from './Article/ArticleModal';
import PaginateArticles from './Article/PaginateArticles';
import Error from '../Reusable/Error';

export const NewsContext = createContext();

function News() {

    const { isAdmin } = useContext(adminContext);
    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [articles, setArticles] = useState([]);
    const [link, setLink] = useState('')

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(!link ? `${process.env.REACT_APP_SERVER}/articles?sort=name,-date&limit=3` : link);
            if (response.ok) {
                const data = await response.json()
                setArticles(data)
                setLoading(false)
            } else {
                setLoading(false)
                setError(true)
                throw new Error('Something went wrong')
            }
        } catch (error) {
            setLoading(false)
            setError(true)
            console.error(error);
        }
    }, [link])

    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link])

    return (
        <Container fluid className='news'>
            <NewsContext.Provider value={fetchNews}>
                {
                    isAdmin &&
                    <div className='admin-tools'>
                        <IoCreateOutline onClick={() => setModalShow(true)} />
                        <ArticleModal show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                }
                <Headers title={addNewsTitleLanguage(language)} />
                {error && <Error />}
                <div className='news-body'>
                    {
                        loading
                            ? <Watch height="30" width="30" color='grey' ariaLabel='loading' />
                            : articles.articles ? articles.articles.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1).map((news, index) => (
                                <NewsItem news={news} key={index} language={language} />
                            )) : null
                    }
                </div>
                <PaginateArticles
                    total={articles && articles.pageTotal}
                    links={articles && articles.links}
                    link={(e) => setLink(e)}
                />
            </NewsContext.Provider>
        </Container >
    )
}

export default News;

