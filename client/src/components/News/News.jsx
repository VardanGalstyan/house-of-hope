import './style.css';
import React, { useState, useContext, useEffect, createContext } from 'react';
import { languageContext } from '../../App';
import { Container, Alert } from 'react-bootstrap';
import NewsItem from './NewsItem';
import Headers from '../Reusable/Headers';
import ArticleModal from './Article/ArticleModal';
import PaginateArticles from './Article/PaginateArticles';
import { IoCreateOutline } from 'react-icons/io5';
import { Watch } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export const NewsContext = createContext();

function News() {


    const [modalShow, setModalShow] = useState(false);
    const { language } = useContext(languageContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [articles, setArticles] = useState([]);
    const [link, setLink] = useState('')





    const fetchNews = async () => {
        try {
            setLoading(true)
            const response = await fetch(!link ? 'articles?limit=3' : link);
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
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link])

    return (
        <Container fluid className='news'>
            <NewsContext.Provider value={fetchNews}>
                <div className='admin-tools'>
                    <IoCreateOutline onClick={() => setModalShow(true)} />
                    <ArticleModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
                <Headers
                    title={language === 'am' ? 'Նորություններ' : 'Nachrichten'}
                    paragraph={language === 'am' ? 'Ինչ որ տեքստ' : 'etwas besonders'}
                />
                {
                    error &&
                    <Alert variant="danger" className='d-flex justify-content-center' >
                        <Alert.Heading>oops! You got an error!</Alert.Heading>
                    </Alert>
                }
                <div className='news-body'>
                    {
                        loading ?
                            <Watch
                                height="30"
                                width="30"
                                color='grey'
                                ariaLabel='loading'
                            />
                            :
                            articles.articles ? articles.articles.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1).map((news, index) => (
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

