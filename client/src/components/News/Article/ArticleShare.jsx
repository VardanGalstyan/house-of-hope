import React from 'react';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const shareUrl = 'www.saturday-game.com'
const title = "Saturday Game"

function ArticleShare() {
    return (
        <div className='article-share'>
            <FacebookShareButton
                url={shareUrl}
                quote={title}
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
                title={title}
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        </div>
    );
}

export default ArticleShare;
