import React, { useContext, useState, useEffect, createContext } from 'react'
import { languageContext } from '../../App.js'
import { Container } from 'react-bootstrap';
import TeamMember from './TeamMember';
import { IoCreateOutline } from 'react-icons/io5';
import NewTeamMemberModal from './NewTeamMemberModal.jsx';
import Loader from '../Reusable/Loader.jsx';
import Error from '../Reusable/Error.jsx';
import Headers from '../Reusable/Headers.jsx';

export const teamMemberContext = createContext();

function Team() {

    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getTeams = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://house-of-hope.herokuapp.com/teams');
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
                    <IoCreateOutline onClick={() => setModalShow(true)} />
                    <NewTeamMemberModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
                <Headers
                    title={language === 'am' ? "Մեր Աշխատակիցները" : "Unsere Mitarbeiter"}
                    paragraph={language === 'am' ? "Մեր Աշխատակիցները" : "Unsere Mitarbeiter"}
                />
                <div className='team-container'>
                    {
                        error ?
                            <Error /> :
                            loading ? <Loader /> :
                                team.map((member, i) => < TeamMember key={member._id} member={member} reload={getTeams} />)
                    }
                </div>
            </teamMemberContext.Provider>
        </Container>
    )
}

export default Team