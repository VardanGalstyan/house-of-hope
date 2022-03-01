import React from 'react';
import { Col } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function NewsItem({ news, language }) {
    const navigate = useNavigate();

    const getDate = news.createdAt.split('T')[0];
    const date = new Date(getDate);
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return (
        <Col md={3} className='news-body-item'>
            <img src={news.pictures[0]} alt="body-item-cover" />
            <div className='news-body-footer'>
                <div className='news-body-item-date'>{`${month} ${day}, ${year}`}</div>
                <h3>{language === 'am' ? news.title_am : news.title_de}</h3>
                <p>{language === 'am' ? news.description_am : news.description_de}</p>
                <div className='news-body-item-read-more'>
                    <span onClick={() => navigate(`article/${news._id}`)}>{language === 'am' ? 'ՏԵՍՆԵԼ ԱՎԵԼԻՆ' : 'Read more'}</span>
                    <span><BsArrowRight /></span>
                </div>
            </div>
        </Col>
    );
}

export default NewsItem;
