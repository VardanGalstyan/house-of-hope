import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { addVolunteerButton, newVolunteerEmail, newVolunteerMessage, newVolunteerName, newVolunteerPhone } from './content';
import { handleFormCloseLanguage, handleFormConfirmLanguage } from '../projects/content';

function VolunteersModal(props) {

    const [value, setValue] = useState(null)
    const { language } = props

    return <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {addVolunteerButton(language)}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder={newVolunteerName(language)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder={newVolunteerEmail(language)}
                    />
                </Form.Group>
                <Form.Group>
                    <PhoneInput
                        placeholder={newVolunteerPhone(language)}
                        defaultCountry="AM"
                        value={value}
                        onChange={setValue}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={newVolunteerMessage(language)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>{handleFormConfirmLanguage(language)}</Button>
            <Button onClick={props.onHide}>{handleFormCloseLanguage(language)}</Button>
        </Modal.Footer>
    </Modal>;
}

export default VolunteersModal;
