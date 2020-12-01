import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


export default function Modale({ show, setShow, setText, text }) {
    // const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Change text
             </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label style={{ marginRight: 10 }}>Button's text</label>
                    <input style={{ width: "100%" }} type="text" value={text} placeholder="write something" onChange={(e) => setText(e.target.value)} ></input>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                   </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
