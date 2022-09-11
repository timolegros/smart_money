import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap'
import {useState} from "react";

const CreateAccount = () => {
    const [savingPercentValue, setSavingPercentValue] = useState();
    const handleChange = (e) => {
        console.log(e.target.value);
        setSavingPercentValue(e.target.value);
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Sponsor's METAMASK Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter address" />
                    <Form.Text className="text-muted">
                        We'll never share this address with anyone else
                    </Form.Text>
                </Form.Group>

                <Form.Label >What percentage of your funds should be in your savings account?</Form.Label>
                <Form.Range id="fund-percent-slider" onChange={handleChange} min="0" max="100" step="1"/>
                <b></b>

                <Button variant="primary" type="submit" style={{marginTop: "1em", marginBottom: "5em"}}>
                    Submit
                </Button>
            </Form>
        </div>
     );
}

export default CreateAccount;
