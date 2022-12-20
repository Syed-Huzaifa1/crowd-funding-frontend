import React from "react";
import { Modal, Button } from 'react-bootstrap'
import DonationForm from "./Form";


const DonationModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DonationForm campaign={props.campaign} currency={props.currency} close={props.close} />
            </Modal.Body>
        </Modal>
    )
}

export default DonationModal;