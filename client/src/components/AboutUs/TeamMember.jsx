import { useContext, useState } from 'react'
import { languageContext } from '../../App.js'
import { Col } from 'react-bootstrap';
import { MdModeEdit } from 'react-icons/md';
import { TiUserDelete } from 'react-icons/ti';
import NewTeamMemberModal from './NewTeamMemberModal.jsx';
import MemberDeleteModal from './MemberDeleteModal.jsx';

function TeamMember({ member, admin }) {

    const { name_de, name_am, name_en, position_am, position_de, position_en } = member;
    const [modalShow, setModalShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { language } = useContext(languageContext);
    const arm = language === 'am'
    const de = language === 'de'
    const en = language === 'en'

    return (
        <Col xs={10} md={3} className='team-member'>
            <div className='member-header'>
                <img src={member.avatar.url} alt="team-member" />
            </div>
            <div className='member-body'>
                <h4>{arm ? name_am : de ? name_de : en ? name_en : null}</h4>
                <p>{arm ? position_am : de ? position_de : en ? position_en : null}</p>
            </div>
            {admin &&
                <div className='admin-tools'>
                    <MdModeEdit onClick={() => setModalShow(true)} />
                    <TiUserDelete onClick={() => setShowDeleteModal(true)} />
                </div>
            }
            <NewTeamMemberModal member={member} show={modalShow} onHide={() => setModalShow(false)} />
            <MemberDeleteModal member={member} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} language={language} />
        </Col>
    )
}

export default TeamMember