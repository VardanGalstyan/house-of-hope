import { useContext } from 'react';
import { languageContext } from '../../../App';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const shareUrl = window.location.href

function ArticleShare({ article }) {

    const { language } = useContext(languageContext)
    const am = language === 'am'
    const en = language === 'en'
    const de = language === 'de'

    console.log(article);
    return (
        <div className='article-share'>
            <FacebookShareButton
                url={shareUrl}
                quote={am ? article?.title_am : en ? article?.title_en : de ? article?.title_de : ''}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
            >
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <WhatsappShareButton
                url={shareUrl}
                title={am ? article?.title_am : en ? article?.title_en : de ? article?.title_de : ''}
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        </div>
    );
}

export default ArticleShare;
