import Form from 'react-bootstrap/Form';

const CreateAccount = () => {
    return (
        <div>
            <Form>
                <Form.Label >What percentage of your funds should be in your savings account?</Form.Label>
                <Form.Range id="fund-percent-slider" />
                {console.log(document.getElementById("fund-percent-slider").value)}
                <b></b>
            </Form>
        </div>
     );
}

export default CreateAccount;
