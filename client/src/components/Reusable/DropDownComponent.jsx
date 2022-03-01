import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import NewProjects from '../projects/NewProjects';
import './style.css';

function DropDown({ show, toggle, title }) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div className='admin-options'>
            <BsThreeDots onClick={() => toggle()} />
            <Dropdown onSelect={() => toggle()} show={show} >
                <Dropdown.Menu drop={'end'}>
                    <Dropdown.Item onClick={() => setModalShow(true)}>{title}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <NewProjects show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default DropDown;
