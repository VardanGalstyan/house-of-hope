import { Col } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { handleReadMoreLanguage } from './content'

function NewsItem({ news, language }) {
    const navigate = useNavigate();

    const {
        title_am,
        title_en,
        title_de,
        description_am,
        description_en,
        description_de,
        pictures,
        createdAt,
        _id
    } = news
    const am = language === "am"
    const en = language === "en"
    const de = language === "de"

    // D A T E  F O R M A T I N G
    const getDate = createdAt.split('T')[0];
    const date = new Date(getDate);
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return (
        <Col md={3} className='news-body-item'>
            <img src={pictures.length > 0 ? pictures[0].url : 'https://via.placeholder.com/900'} alt="body-item-cover" />
            <div className='news-body-footer'>
                <div className='news-body-item-date'>{`${month} ${day}, ${year}`}</div>
                <h3>{am ? title_am : de ? title_de : en ? title_en : null}</h3>
                <p>{am ? description_am : de ? description_de : en ? description_en : null}</p>
                <div className='news-body-item-read-more'>
                    <span onClick={() => navigate(`article/${_id}`)}>
                        {handleReadMoreLanguage(language)}
                    </span>
                    <span><BsArrowRight /></span>
                </div>
            </div>
        </Col>
    );
}

export default NewsItem;
