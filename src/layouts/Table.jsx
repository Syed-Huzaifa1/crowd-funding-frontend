import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DonationModal from './Modal'
import { Table, Button } from 'react-bootstrap'

const Response = () => {
    const [campaign, setCampaign] = useState([]);
    const [currency, setCurrency] = useState({});
    const [selectedCampaign, setSelectedCampaign] = useState({});
    const [loading, setloading] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = (data) => {
        setSelectedCampaign(data)
        setShow(true);
    }

    const fetchCampaigns = async () => {
        setloading(true)
            await axios.get('http://localhost:8080/campaigns')
            .then((res)  => {
                setCampaign(res.data);
                setloading(false)
            }).catch((err) => {
                setloading(false)
                console.log('error', err);
            })
    }

    const fetchCurrencies = async () => {
        await axios.get('http://localhost:8080/currencies')
            .then((res) => {
                setCurrency(res.data)
            }).catch((err) => {
                console.log('err', err);
            })
    }

    const handleClose = async () => {
        await fetchCampaigns();
        setShow(false)
    };
    useEffect(() => {
        fetchCampaigns();
        fetchCurrencies();
    }, [])
    return (
        <div>
            {loading ? 'Loading data' : 
            <Table striped bordered hover responsive variant='dark'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {campaign.map((data) => (
                        <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.description}</td>
                            <td>{data.target_amount}</td>
                            <td><Button disabled={data.status === 'successful'} variant="outline-success" onClick={() => handleShow(data)}>{data.status === 'successful' ? 'Campaign successful' : 'Donate'}</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
            {show && (
                <DonationModal close={handleClose} show={show} campaign={selectedCampaign} currency={currency} />
                )}
        </div>
    )
}

export default Response;