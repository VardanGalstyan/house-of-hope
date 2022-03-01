import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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
                {language === 'am' ? 'Միացիր հիմա' : 'Become a Proud Volunteer Now'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder={language === 'am' ? 'Ձեր անունը' : 'Hier'}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder={language === 'am' ? 'էլ - փոստի հասցեն' : 'Hier'}
                    />
                </Form.Group>
                <Form.Group>
                    <PhoneInput
                        placeholder={language === 'am' ? 'Հեռախոսահամարը' : 'Hier'}
                        defaultCountry="AM"
                        value={value}
                        onChange={setValue}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={language === 'am' ? 'Ձեր հաղորդագրությունը' : 'Hier'}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            {
                language === 'am' ?
                    <>
                        <Button onClick={props.onHide}>Հաստատել</Button>
                        <Button onClick={props.onHide}>Չեղարկել</Button>
                    </> :
                    <>
                        <Button onClick={props.onHide}>Send</Button>
                        <Button onClick={props.onHide}>Close</Button>
                    </>
            }
        </Modal.Footer>
    </Modal>;
}

export default VolunteersModal;
