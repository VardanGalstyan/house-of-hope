import { useState } from 'react'
import { Col } from 'react-bootstrap'
import { MdModeEdit } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import DeletePartnerModal from './DeletePartnerModal';
import NewPartnerModal from './NewPartnerModal';


function NewPartner({ partner, admin, language }) {

    const { name_am, name_de, name_en } = partner;
    const [modalShow, setModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const arm = language === 'am';
    const de = language === 'de';
    const en = language === 'en';


    return (
        <Col md={3} className='single-partner'>
            <div className='single-partner-image'>
                <img src={partner.avatar} alt="partner-logo" />
            </div>
            {!partner.avatar ? <span>{arm ? name_am : de ? name_de : en ? name_en : null}</span> : null}
            {
                admin &&
                <div className='admin-tools'>
                    <MdModeEdit onClick={() => setModalShow(true)} />
                    <TiDelete onClick={() => setDeleteModalShow(true)} />
                </div>
            }
            <DeletePartnerModal partner={partner} show={deleteModalShow} language={language} onHide={() => setDeleteModalShow(false)} />
            <NewPartnerModal partner={partner} show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
    )
}

export default NewPartner