import React, { useContext, useState } from 'react'
import { languageContext } from '../../App.js'
import { Col } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md';
import { TiUserDelete } from 'react-icons/ti';
import NewTeamMemberModal from './NewTeamMemberModal.jsx';
import MemberDeleteModal from './MemberDeleteModal.jsx';

function TeamMember({ member }) {

    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return (
        <Col xs={10} md={3} className='team-member'>
            <div className='member-header'>
                <img src={member.avatar} alt="team-member" />
            </div>
            <div className='member-body'>
                <h4>{language === 'am' ? member.name_am : member.name_de}</h4>
                <p>{language === 'am' ? member.position_am : member.position_de}</p>
            </div>
            <div className='admin-tools'>
                <MdModeEdit onClick={() => setModalShow(true)} />
                <TiUserDelete onClick={() => setShowDeleteModal(true)} />
            </div>
            <NewTeamMemberModal member={member} show={modalShow} onHide={() => setModalShow(false)} />
            <MemberDeleteModal member={member} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
        </Col>
    )
}

export default TeamMember