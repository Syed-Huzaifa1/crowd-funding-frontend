import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const DonationForm = (props) => {
  const [donation, setDonation] = useState({
    name: "",
    amount: 0,
    campaign_id: props.campaign.id,
    currencyInfo: {},
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if(e.target.name == 'currencyInfo'){
        var currency = props.currency.find((curr) => {
           return curr.code === e.target.value
        })
        console.log('currency', currency);
        setDonation((prev) => ({ ...prev, [e.target.name]: {
            code: e.target.value,
            id: currency.id
        } }));
    }
    else {
        setDonation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
};

  const submitDonation = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/donate", donation)
      .then((response) => {
        console.log(response);
        props.close();
      })
      .catch((error) => {
        setError(error.response);
      });
  };

  return (
    <Form onSubmit={submitDonation}>
      {error !== "" && <p className="text-center text-danger">{error}</p>}
      <Form.Group className="mb-3">
        <Form.Label>Nick name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nick Name"
          name="name"
          onChange={handleChange}
        />
      </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Amount</Form.Label>
    <Form.Control
      type="number"
      placeholder="Amount"
      name="amount"
      min="0"
      max={props.campaign.amount}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Currencies</Form.Label>
    <Form.Select size="lg" name="currencyInfo" onChange={handleChange} required>
      <option id="default" value="">
        Select Currency
      </option>
      {props.currency.map((data) => (
        <option key={data.id} id={data.id} value={data.code}>
          {data.name}
        </option>
      ))}
    </Form.Select>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  );
};

export default DonationForm;