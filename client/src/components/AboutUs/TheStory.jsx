import { useState, useContext } from 'react'
import { languageContext } from '../../App.js';
import {
    handleHistoryTitle,
    handleHistoryParagraph,
    handleHistoryParagraphOne,
    handleHistoryParagraphTwo,
    handleHistoryParagraphThree,
    handleHistoryParagraphFour,
    handleHistoryParagraphFive,
    handleHistoryParagraphBottom
} from '../AboutUs/content.js';
import Headers from '../Reusable/Headers.jsx';

function TheStory() {

    const [storyText, setStoryText] = useState('')
    const storyDates = ['1994', '2002', '2003', '2005', '2017']
    const { language } = useContext(languageContext);

    const handleStory = (e) => {
        setTimeout(() => { setStoryText(e.target.children[0].innerText) }, 400)
    }

    return (
        <div className='about-us-body-history'>
            <Headers title={handleHistoryTitle(language)} />
            <div className='history-paragraph'>  {handleHistoryParagraph(language)} </div>
            <div className='date-container'>
                {
                    storyDates.map((date, i) => (
                        <div key={i} onMouseEnter={(e) => handleStory(e)} className='date-spinner'>
                            <span>{date}</span>
                        </div>
                    ))
                }
            </div>
            {
                (storyText === '1994') ?
                    < div className='history-paragraph'>
                        {handleHistoryParagraphOne(language)}
                        <div className='paragraph-image-container'>
                            <img src="https://picsum.photos/200/300" alt="beginning" />
                        </div>
                    </div> :
                    (storyText === '2002') ?
                        <div className='history-paragraph'>
                            {handleHistoryParagraphTwo(language)}
                            <div className='paragraph-image-container'>
                                <img src="https://picsum.photos/200/300" alt="beginning" />
                            </div>
                        </div> :
                        (storyText === '2003') ?
                            <div className='history-paragraph'>
                                <div className='paragraph-image-container'>
                                    <img src="https://picsum.photos/200/300" alt="beginning" />
                                </div>
                                {handleHistoryParagraphThree(language)}
                            </div> :
                            (storyText === '2005') ?
                                <div className='history-paragraph'>
                                    <div className='paragraph-image-container'>
                                        <img src="https://picsum.photos/200/300" alt="beginning" />
                                    </div>
                                    {handleHistoryParagraphFour(language)}
                                </div> :
                                (storyText === '2017') ?
                                    <div className='history-paragraph'>
                                        <div className='paragraph-image-container'>
                                            <img src="https://picsum.photos/200/300" alt="beginning" />
                                        </div>
                                        {handleHistoryParagraphFive(language)}
                                    </div> : null
            }
            <div className='history-paragraph'>
                {handleHistoryParagraphBottom(language)}
            </div>
        </div >
    )
}

export default TheStory