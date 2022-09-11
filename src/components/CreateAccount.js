import Form from 'react-bootstrap/Form';
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
                <Form.Label >What percentage of your funds should be in your savings account?</Form.Label>
                <Form.Range id="fund-percent-slider" onChange={handleChange} min="0" max="100" step="1"/>
                <b></b>
            </Form>
        </div>
     );
}

export default CreateAccount;
