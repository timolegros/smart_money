import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap'
import {useState} from "react";

const CreateAccount = ({setNewAccountAddress, factoryInstance, signer}) => {
    const [savingPercentValue, setSavingPercentValue] = useState();
    const [sponsorAddress, setSponsorAddress] = useState();

    const handlePercentChange = (e) => {
        console.log(e.target.value);
        setSavingPercentValue(e.target.value);
    }
    const handleAddressChange = (e) => {
        console.log(e.target.value);
        setSponsorAddress(e.target.value);
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (!sponsorAddress || !savingPercentValue) {
            console.error("Invalid form values")
        }

        try {
            const result = await factoryInstance.connect(signer).createAccount(savingPercentValue, sponsorAddress);
            const receipt = await result.wait();
            console.log(receipt);
            const accountAddress = receipt.events[0].args[1];
            console.log("New account created:", accountAddress);

            setNewAccountAddress(accountAddress);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formSponsorAddress">
                    <Form.Label>Your Sponsor's Ethereum Address</Form.Label>
                    <Form.Control placeholder="0x0000000000000000000000000000000000000000" onChange={handleAddressChange}/>
                </Form.Group>

                <Form.Label >What percentage of your funds should be in your savings account?</Form.Label>
                <h4>{savingPercentValue}%</h4>
                <Form.Range id="fund-percent-slider" onChange={handlePercentChange} min="0" max="100" step="1"/>

                <Button variant="primary" type="submit" onClick={handleCreateAccount} style={{marginTop: "1em", marginBottom: "5em"}}>
                    Submit
                </Button>
            </Form>
        </div>
     );
}

export default CreateAccount;
