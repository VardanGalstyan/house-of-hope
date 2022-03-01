import React, { useState, useContext } from 'react'
import { languageContext } from '../../App.js';
import Headers from '../Reusable/Headers.jsx';

function TheStory() {

    const [storyText, setStoryText] = useState('')
    const storyDates = ['1994', '2002', '2003', '2005', '2017']
    const { language } = useContext(languageContext);

    const handleStory = (e) => {
        setTimeout(() => {
            setStoryText(e.target.children[0].innerText)
        }, 400)
    }

    return (
        <div className='about-us-body-history'>
            <Headers title={language === 'am' ? "Մեր Պատմությունը" : "Unsere Geschichte"} />
            <div className='history-paragraph'>
                {
                    language === 'am' ?
                        <p> Գերմանական Կարմիր Խաչի Բադեն-Վյուրտեմբերգի Երկրամասային Կազմակերպությունն իր գործունեությունը Հայաստանում սկսել է դեռևս 1988թ. ավերիչ երկրաշարժից հետո՝ այդ ժամանակ դեռևս Խորհրդային Միության Կարմիր Խաչի և Կարմիր Մահիկի, իսկ այնուհետև Հայկական Կարմիր Խաչի Ընկերության հետ սերտ համագործակցությամբ իրականացնելով մարդասիրական տարբեր նախաձեռնություններ: </p> :
                        <p>  Der DRK Landesverband Baden-Württemberg hat seine Tätigkeit in Armenien noch nach dem verheerenden Erdbeben 1988 begonnen, indem er noch bei dieser Zeit in enger Abstimmung mit der Rotkreuz- und Rothalbmondbewegung der Sowjetunion, und dann mit der Gesellschaft des Armenischen Roten Kreuzes verschiedene humanitäre Aktionen durchgeführt hat.</p>
                }
            </div>
            <div className='date-container'>
                {
                    storyDates.map((date, i) => (
                        <div
                            key={i}
                            onMouseEnter={(e) => handleStory(e)}
                            className='date-spinner'>
                            <span>{date}</span>
                        </div>
                    ))
                }
            </div>
            {
                (storyText === '1994') ?
                    < div className='history-paragraph'>
                        {
                            language === 'am' ?
                                <p>1994թ. երկրամասային կազմակերպության ներկայացուցիչ Գերհարդ Մայերն իր հայրենի Շվեբիշ Գմյունդից և շրջակայքից բազմաթիվ նվիրատուների աջակցությամբ կյանքի կոչեց «Գթության խոհանոց-բարեգործական ճաշարան Երևանի համար» ծրագիրը՝ որի շրջանակում սոցիալապես առավել անապահով մարդիկ հնարավորություն ունեցան օրական մեկ անգամ տաք և կալորիապես հարուստ սնունդ ճաշակելու: </p> :
                                <p> Im Jahr 1994 rief Gerhard Maier, der Vertreter des Landesverbandes, mit Unterstützung zahlreicher Spenderinnen und Spender aus seiner Heimatstadt Schwäbisch Gmünd und Umgebung das Projekt ’’Küche der Barmherzigkeit – Suppenküche für Eriwan’’ ins Leben. Er eröffnete caritative Suppenküchen, wo sozialbedürftige Menschen die Möglichkeit hatten, einmal täglich ein warmes und kalorienreiches Essen zu bekommen.</p>
                        }
                        <div className='paragraph-image-container'>
                            <img src="https://picsum.photos/200/300" alt="beginning" />
                        </div>
                    </div> :
                    (storyText === '2002') ?
                        <div className='history-paragraph'>
                            {
                                language === 'am' ?
                                    <p>2002թ. Գերհարդ Մայերի ողբերգական մահից հետո նրա մարդասիրական գաղափարներն ու սկսած գործը շարունակեց քահանա Կառլ-Հայնց Շայդեն, ով Շվեբիշ Գմյունդ քաղաքում ստեղծեց «Գթության խոհանոց» ընկերական շրջանը, որում միավորված նրա ընկերների ու աջակիցների ջանքերով ապահովվում է ծրագրի շարունակականությունը:</p> :
                                    <p> Nach dem tragischen Tod von Gerhard Maier 2002 setzte Pfarrer Karl-Heinz Scheide seine humanitären Ideen und begonnene Tätigkeit fort. Er gründete in Schwäbisch Gmünd den Freundeskreis ''Küche der Barmherzigkeit''. Durch die Mühen seiner Freunde und Unterstützer im Freundeskreis wird schon seit vielen Jahren die Nachhaltigkeit des Projektes gesichert. </p>
                            }
                            <div className='paragraph-image-container'>
                                <img src="https://picsum.photos/200/300" alt="beginning" />
                            </div>
                        </div> :
                        (storyText === '2003') ?
                            <div className='history-paragraph'>
                                <div className='paragraph-image-container'>
                                    <img src="https://picsum.photos/200/300" alt="beginning" />
                                </div>
                                {
                                    language === 'am' ?
                                        <p> Նպատակ ունենալով տեղում համակարգել բոլոր այդ բարեգործական ծրագրերը՝ ԳԿԽ ԲՎ ԵԿ նախագահության որոշմամբ, Կարմիր Խաչի և Կարմիր Մահիկի միջազգային ֆեդերացիայի, ինչպես նաև Հայկական Կարմիր Խաչի Ընկերության հետ համաձայնեցմամբ 2003թ մայիսի 19-ին Երևանում բացվեց երկրամասային կազմակերպության հայաստանյան մասնաճյուղը, որը, սերտ համագործակցելով Հայկական Կարմիր Խաչի Ընկերության, Երևանի քաղաքապետարանի, վարչական շրջանների, Արտակարգ Իրավիճակների նախարարության, «Հայաստան» համահայկական հիմնադրամի և այլ կազմակերպությունների հետ, շարունակեց ծրագրերի իրականացումը: </p> :
                                        <p> Um all diese karitativen Projekte zu koordinieren, wurde am 19. Mai 2003 durch den Beschluss des Präsidiums des DRK Landesverbandes Baden-Württemberg und in Abstimmung mit der Internationalen Föderation der Rotkreuz- und Rothalbmondbewegung und dem Armenischen Roten Kreuz die Zweigstelle in Armenien eröffnet, die die Durchführung der Projekte fortsetzte, indem es sich eng mit der Gesellschaft des Armenischen Roten Kreuzes, Jerewaner Rathaus, mit den Gemeindverwaltungen von Jerewan, Katastrofenschutzministerium RA, Stiftung ''All Armenian Fund'' und mit anderen Organisationen kooperierte. </p>
                                }
                            </div> :
                            (storyText === '2005') ?
                                <div className='history-paragraph'>
                                    <div className='paragraph-image-container'>
                                        <img src="https://picsum.photos/200/300" alt="beginning" />
                                    </div>
                                    {
                                        language === 'am' ?
                                            <p>2005թ. Երևանի քաղաքապետարանի կողմից կողմից տրամադրված անվճար հողատարածքում կառուցվեց «Հուսո տուն» բարեգործական կենտրոնը, որն իր տանիքի տակ առավ «Գթության խոհանոց» ծրագիրն իր «Տնային խնամք» և «Մանկական սնունդ» ենթածրագրերով: Կենտրոնում մատուցվում են նաև օգտագործված հագուստի ընդունման և բաշխման ծառայություններ, գործում է լվացքատուն և լոգասենյակ: «Հուսո տանը» շահառուների համար պարբերաբար կազմակերպվում են տարբեր սոցիալական միջոցառումներ: </p> :
                                            <p> Im Jahr 2005 wurde auf dem vom Jerewaner Rathaus kostenlos überlassenen Territorium das Wohltätigkeitszentrum ’’Haus der Hoffnung’’ gebaut, das das Projekt ''Küche der Barmherzigkeit'' mit seinen Unterprojekten ''Hauspflege'' und ''Kinderspeisung'' unter sein Dach nahm. Im Zentrum werden auch Aufnahme-und Verteilungsdienste von gebrauchter Kleidung geleistet, es sind Wäschrei und Badezimmer vorhanden. Im ’’Haus der Hoffnung’’ werden für die Beneficiaries oft viele Sozialveranstaltungen organisiert. </p>
                                    }
                                </div> :
                                (storyText === '2017') ?
                                    <div className='history-paragraph'>
                                        <div className='paragraph-image-container'>
                                            <img src="https://picsum.photos/200/300" alt="beginning" />
                                        </div>
                                        {
                                            language === 'am' ?
                                                <div>
                                                    <p>Տարեցտարի Հայաստանում սոցիալապես անապահով մարդկանց թվի ավելացումը և ֆինանսական միջոցների սղությունն անհրաժեշտություն ստեղծեց Հայաստանում ունենալու իրավաբանական անձի կարգավիճակ ունեցող կառույց, որը տեղում կկարողանար տեղական նվիրատուների միջոցով ներգրավել հանգանակություններ և իրականացնել եկամտաբեր ծրագրեր՝ աջակցելով «Գթության խոհանոց» ծրագրին: Հենց այդ նպատակով էլ 2017թ. մարտի 28-ին ստեղծվեց «Հուսո տուն բարեգործական կենտրոն» հիմնադրամը:  </p>
                                                    <p>2017թ. հունիսի 23-ին Հայաստանում ԳԿԽ ԲՎ ԵԿ մասնաճյուղի և «Հուսո տուն բարեգործական կենտրոն» հիմնադրամի միջև կնքվեց համագործակցության պայմանագիր, որը հնարավորություն տվեց Մասնաճյուղի հետ համատեղ գործունեություն ծավալել՝ ապահովելով լրացուցիչ միջոցներ «Գթության խոհանոց» ծրագրի համար:</p>
                                                    <p>2017թ. հոկտեմբերի 1-ից «Հուսո տուն բարեգործական կենտրոն» հիմնադրամ «Սյունիք-Զարգացում» ՀԿ-ի հետ համագործակցությամբ իրականացնում է «Տեղահանված և սոցիալապես խոցելի խմբերի ներգրավումը հայաստանյան աշխատաշուկայում մասնագիտական կրթության և աջակցության միջոցով» ծրագիրը, որի նպատակն է ինտեգրել տեղահանված և սոցիալապես խոցելի մարդկանց հայաստանյան միջավայր՝ աշխատաշուկա և հասարակություն:  </p>
                                                    <p>Ապագայում պլանավորվում են իրականացնել այլ սոցիալական ծրագրեր, որոնք կնպաստեն Հայաստանի սոցիալական իրավիճակի բարելավմանը:</p>
                                                </div> :
                                                <div>
                                                    <p> Die von Jahr zu Jahr zunehmende Anzahl der Bedürftigen und der Mangel an finanziellen Mitteln führten dazu, in Armenien eine Institution mit juristischem Rechststatus zu haben, die durch die örtlichen Spender Geldspenden involvieren, profitabele Projekte durchführen und damit das Projekt ’’Küche der Barmehrzigkeit’’ unterstützen könnte. Zu diesem Zweck wurde am 28. März 2017 die Stiftung ''Wohltätigkeitszentrum Haus der Hoffnung'' gegründet. </p>
                                                    <p> Am 23. Juni 2017 wurde zwischen der DRK LV BW Zweigstelle und Stiftung ''Wohltätigkeitszentrum Haus der Hoffnung'' einen Kooperationsvertrag abgeschlossen, der die Möglichkeit gab, gemeinsame Tätigkeit mit der Zweigstelle auszuführen und zusätzliche Mittel für das Projekt ''Küche der Barmehrzigkeit'' einzubringen. </p>
                                                    <p> Seit dem 1. Oktober 2017 führt die Stiftung in Kooperation mit ''Syunik-Entwicklung'' NRO das Projekt  "Berufsausbildung und Unterstützung für die Integration von vertriebenen und marginalisierten Menschen in den armenischen Arbeitsmarkt’’ durch. Das Ziel des Projektes ist die Involvierung der vertriebenen und sozialbedürftigen Menschen in die armenischen Umgebung, in den Arbeitsmarkt und in die Gesellschaft. </p>
                                                    <p> In der Zukunft ist geplant, noch andere soziale Projekte durchzuführen, die zur Erleichterung der sozialen Situation in Armenien beitragen werden. </p>
                                                </div>
                                        }
                                    </div> : null
            }
            <div className='history-paragraph'>
                {
                    language === 'am' ?
                        <p>Ստեղծման օրվանից Հիմնադրամն անհատական նվիրատվությունների և ծառայությունների մատուցման միջոցով ստացված հասույթը փոխանցել է «Գթության խոհանոց» ծրագրին:  </p> :
                        <p> Seit dem Gründungstag hat die Stiftung den von den privaten Spenden und durch die Dienstleistungen eingenommenen Erlös dem Projekt ’’Küche der Barmehrzigkeit’’ zugeführt. </p>
                }
            </div>
        </div >
    )
}

export default TheStory