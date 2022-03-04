export const handlePartnerTitle = (value) => {
    if (value === 'am') {
        return (
            "Մեր Գործընկերները"
        )
    } else if (value === 'de') {
        return (
            "Unsere Partner"
        )
    } else if (value === 'en') {
        return (
            "Our Partners"
        )
    }
}

export const handlePartnerHeader = (val1, val2) => {
    if (val1 === 'am') {
        return (
            <>
                <h1>Մենք Երախտապարտ ենք</h1>
                <p className={val2 ? 'partners-header-show-more' : 'partners-header-show-less'}>
                    «Գթության խոհանոց» ծրագրի ստեղծման օրվանից հետո բազմաթիվ գերմանացի և հայ գթասիրտ մարդիկ հավաքվեցին մեկ գաղափարի շուրջ, այն է՝ օգնել կարիքավորներին՝ թոթափելու սոցիալական լարվածությունը և ապրելու արժանավայել կյանքով: Այս աննկարագրելի աջակցությունը, որը շարունակվում է մինչ օրս, միշտ կմնա այն մարդկանց սրտերում, ովքեր իրենց դժվարին պահերին զգացել են մեր նվիրատուների գթասրտությունը:
                    <br />
                    <br />
                    Մենք երախտապարտ ենք բոլոր նրանց, ովքեր տարիներ շարունակ իրենց ներդրումն են ունեցել մարդասիրական այս մեծ գաղափարի իրագործման մեջ:
                    <br />
                    <br />
                    Շնորհակալություն ենք հայտնում՝
                </p>
            </>
        )
    } else if (val1 === 'de') {
        return (
            <>
                <h1>Wir sind dankbar</h1>
                <p className={val2 ? 'partners-header-show-more' : 'partners-header-show-less'}>
                    Wir sind dankbar
                    Erst nach dem Gründungstag des Projektes ’’Küche der Barmehrzigkeit’’ versammelten sich zahlreiche armenische und deutsche gutherzige Menschen um eine Idee, die das Ziel hatte, den Bedürftigen zu helfen, die soziale Schwierigkeiten zu überwinden und ein würdiges Leben zu verbringen. Diese unschätzbare Unterstützung, die bis heute fortgesetzt wird, wird immer in den Herzen diejeniger Menschen bleiben, die in ihren schwierigen Situationen die Barmherzigkeit inserer Spenderinnen und Spender gefühlt haben.
                    <br />
                    <br />
                    Wir sind bei allen dankbar, die seit Jahren ihren Einsatz bei der Erfüllung dieser großen humanitären Idee gehabt haben.
                    <br />
                    <br />
                    Wir bedanken uns herzlich an:
                </p>
            </>
        )
    } else if (val1 === 'en') {
        return (
            <>
                <h1>We are grateful</h1>
                <p className={val2 ? 'partners-header-show-more' : 'partners-header-show-less'}>
                    We're thankful
                    Only after the founding day of the project ''Kitchen of Charity'' numerous Armenian and German kind-hearted people gathered around an idea that aimed to help the needy to overcome social difficulties and to live a dignified life. This invaluable support, which continues to this day, will always remain in the hearts of those who have felt the mercy of our donors in their difficult situations.
                    <br />
                    <br />
                    We are grateful to everyone who has been involved in the fulfillment of this great humanitarian idea over the years.
                    <br />
                    <br />
                    We would like to thank:
                </p>
            </>
        )
    }
}