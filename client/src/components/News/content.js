
export const addNewsTitleLanguage = (value) => {
    if (value === 'am') {
        return "Նորություններ"
    } else if (value === 'de') {
        return "Nachrichten"
    } else if (value === 'en') {
        return "News"
    }
}

export const addNewsParagraphLanguage = (value) => {
    if (value === 'am') {
        return "Ինչ որ տեքստ"
    } else if (value === 'de') {
        return "Was ist neu?"
    } else if (value === 'en') {
        return "What's new?"
    }
}

// A R T I C L E S M O D A L E S

export const addNewsModalTitle = (value) => {
    if (value === 'am') {
        return "Նոր Հոդված"
    } else if (value === 'de') {
        return "Wählen Sie Datum"
    } else if (value === 'en') {
        return "Choose Date"
    }
}

export const addNewsDateLanguage = (value) => {
    if (value === 'am') {
        return "Ընտրել տարեթիվը"
    } else if (value === 'de') {
        return "Neuer Artikel"
    } else if (value === 'en') {
        return "New Article"
    }
}

export const handleModalDeleteLanguage = (value) => {
    if (value === 'am') {
        return "Ցանկանում եք հեռացնե՞լ այս տեղեկատվությունը"
    } else if (value === 'de') {
        return "Sind Sie sich sicher, dass Sie das entfernen wollen?"
    } else if (value === 'en') {
        return "Are you sure you want to delete this article?"
    }
}

export const handleModalDeleteYesLanguage = (value) => {
    if (value === 'am') {
        return "Այո"
    } else if (value === 'de') {
        return "Ja"
    } else if (value === 'en') {
        return "Yes"
    }
}

export const handleModalDeleteNoLanguage = (value) => {
    if (value === 'am') {
        return "Ոչ"
    } else if (value === 'de') {
        return "Nein"
    } else if (value === 'en') {
        return "No"
    }
}

export const handleReadMoreLanguage = (value) => {
    if (value === 'am') {
        return "Տեսնել Ավելին"
    } else if (value === 'de') {
        return "Mehr erfahren"
    } else if (value === 'en') {
        return "Read More"
    }
}

