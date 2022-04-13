import { useContext, useState, useEffect, createContext } from 'react'
import { languageContext, adminContext } from '../../../App.js'
import { Container } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';
import { handleTeamTitleLanguage, handleTeamParagraphLanguage } from '../content'
import TeamMember from './TeamMember';
import NewTeamMemberModal from '../NewTeamMemberModal';
import Loader from '../../Reusable/Loader';
import Error from '../../Reusable/Error';
import Headers from '../../Reusable/Headers';

export const teamMemberContext = createContext();

function Team() {

    const { isAdmin } = useContext(adminContext);
    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getTeams = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER}/teams`);
            if (response.ok) {
                const data = await response.json();
                setTeam(data);
                setLoading(false);
            } else {
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getTeams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container fluid className='teams'>
            <teamMemberContext.Provider value={getTeams}>
                <div className='admin-options'>
                    {
                        isAdmin &&
                        <>
                            <IoCreateOutline onClick={() => setModalShow(true)} />
                            <NewTeamMemberModal show={modalShow} onHide={() => setModalShow(false)} />
                        </>
                    }
                </div>
                <Headers
                    title={handleTeamTitleLanguage(language)}
                    paragraph={handleTeamParagraphLanguage(language)}
                />
                <div className='team-container'>
                    {
                        error ?
                            <Error /> :
                            loading ? <Loader /> :
                                team.map((member, i) => < TeamMember key={member._id} member={member} reload={getTeams} admin={isAdmin} />)
                    }
                </div>
            </teamMemberContext.Provider>
        </Container>
    )
}

export default Team