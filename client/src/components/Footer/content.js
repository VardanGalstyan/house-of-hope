export const handleFooterAddressLanguage = (value) => {
    if (value === 'am') {
        return (
            <div className='footer-contact-item-address'>
                <span>Մեր հասցեն։</span>
                <span>Դրոյի փող., 22/5 շենք</span>
                <span>Հայաստան, 0069, Երևան</span>
            </div>
        )
    } else if (value === 'de') {
        return (
            <div className='footer-contact-item-address'>
                <span>Unsere Address։</span>
                <span>Dro straße, 22/5 </span>
                <span>Armenia, 0069, Erewan</span>
            </div>
        )
    } else if (value === 'en') {
        return (
            <div className='footer-contact-item-address'>
                <span>Our Address</span>
                <span>Dro Street, 22/5 </span>
                <span>Armenia, 0069, Yerevan</span>
            </div>
        )
    }
}

export const handleFooterPhoneLanguage = (value) => {
    if (value === 'am') {
        return (
            <span>Զանգահարեք Մեզ</span>
        )
    } else if (value === 'de') {
        return (
            <span>Rufen Sie uns an</span>
        )
    } else if (value === 'en') {
        return (
            <span>Call Us</span>
        )
    }
}

export const handleFooterEmailLanguage = (value) => {
    if (value === 'am') {
        return (
            <span>Գրեք Մեզ</span>
        )
    } else if (value === 'de') {
        return (
            <span>Erreiche uns</span>
        )
    } else if (value === 'en') {
        return (
            <span>Reach Us</span>
        )
    }
}

export const handleFooterCopyrightLanguage = (value, date) => {
    if (value === 'am') {
        return (
            <span>Հեղինակային իրավունները պատկանում են՝ © {date} House of Hope. Բոլոր իրավունքները պաշտպանված են։</span>
        )
    } else if (value === 'de') {
        return (
            <span>Alle Rechte vorbehalten © {date} House of Hope. Alle Rechte vorbehalten.</span>
        )
    } else if (value === 'en') {
        return (
            <span>All copyrights belong to © {date} House of Hope. All rights reserved</span>
        )
    }
}

