import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

function PaginateArticles({ total, links, link }) {

    const [selected, setSelected] = useState(0);

    const selectedPage = (e, i) => {
        setSelected(e.target.innerText);
        link(`https://house-of-hope.herokuapp.com/articles?limit=3&offset=${((i + 1) - 1) * 3}`)
    }

    const selectedNavPage = (e) => {

        if (e.target.innerText === '«' && selected > 1) {
            setSelected(1);
            link(links.first)
        } else if (e.target.innerText === '»' && selected !== total) {
            setSelected(total);
            link(links.last)
        } else if (e.target.innerText === '‹' && selected > 1) {
            setSelected(parseInt(selected) - 1);
            link(links.prev)
        } else if (e.target.innerText === '›' && selected < total) {
            setSelected(parseInt(selected) + 1);
            link(links.next)
        }
    }

    return (
        <Pagination>
            <Pagination.First onClick={(e) => selectedNavPage(e)} />
            <Pagination.Prev onClick={(e) => selectedNavPage(e)} />
            {
                [...Array(total ? total : 0)].map((x, i) => (
                    <Pagination.Item
                        key={i}
                        active={parseInt(selected) === i + 1}
                        onClick={(e) => selectedPage(e, i)}>{i + 1}
                    </Pagination.Item>
                ))
            }
            <Pagination.Next onClick={(e) => selectedNavPage(e)} />
            <Pagination.Last onClick={(e) => selectedNavPage(e)} />
        </Pagination>
    )
}

export default PaginateArticles