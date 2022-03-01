import React, { useState, useContext } from 'react'
import { languageContext } from '../../../App';
import { Col } from 'react-bootstrap'
import { MdModeEdit } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import DeletePartnerModal from './DeletePartnerModal';
import NewPartnerModal from './NewPartnerModal';


function NewPartner({ partner }) {

    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);


    return (
        <Col md={3} className='single-partner'>
            <div className='single-partner-image'>
                <img src={partner.avatar} alt="partner-logo" />
            </div>
            {!partner.avatar ? <span>{language === 'am' ? partner.name_am : partner.name_de}</span> : null}
            <div className='admin-tools'>
                <MdModeEdit onClick={() => setModalShow(true)} />
                <TiDelete onClick={() => setDeleteModalShow(true)} />
            </div>

            <DeletePartnerModal partner={partner} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
            <NewPartnerModal partner={partner} show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
    )
}

export default NewPartner