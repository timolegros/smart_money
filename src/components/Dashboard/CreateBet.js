import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {getBankAccount} from "../../util";

function CreateBet({web3Provider, accountAddress, signer}) {
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateClose = async () => {
        try {
            const smartAccount = getBankAccount(accountAddress, web3Provider);
            const result = await smartAccount.connect(signer).placeBet(amount, description);
            const receipt = await result.wait();
            setShow(false);
            window.location.reload()
        } catch (e) {
            console.error(e);
        }
    }

    const handleAmountChange = (e) => {
        console.log(e.target.value);
        setAmount(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        console.log(e.target.value);
        setDescription(e.target.value);
    }

    return (
        <>
            <Button onClick={handleShow} variant="secondary" style={{margin: '1em'}}>
                + Create New Bet
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Bet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBetAmount">
                            <Form.Label>Amount (CA$)</Form.Label>
                            <Form.Control type="number" placeholder="999999" onChange={handleAmountChange} />
                            <Form.Text className="text-muted">
                                We do NOT take any percentage if you lose. Charities receive 100% of this amount.
                            </Form.Text>
                        </Form.Group>

                        <FloatingLabel controlId="floatingTextarea2" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onClick={handleDescriptionChange}
                            />
                        </FloatingLabel>

                        <Form.Label style={{marginTop: '1em'}}>Charity</Form.Label>
                        <Form.Select style={{marginBottom: "1em"}}>
                            <option>UNICEF</option>
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateClose}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateBet;
