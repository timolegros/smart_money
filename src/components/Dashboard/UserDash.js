import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'


const UserDash = () => {
    return (
        <div>
            <div className="status-cards">
                <Card className="balance-card">
                <Card.Body>
                    <Card.Title style={{color: 'black', 'font-size': '5rem'}}>Chequing</Card.Title>
                    <Card.Text style={{color: 'black', 'font-size': '3rem'}}>$ 123424</Card.Text>
                </Card.Body>
                </Card>
                <Card className="balance-card">
                <Card.Body>
                    <Card.Title style={{color: 'black', 'font-size': '5rem'}}>Saving</Card.Title>
                    <Card.Text style={{color: 'black', 'font-size': '3rem'}}>$ 4134131</Card.Text>
                </Card.Body>
                </Card>
                <Button variant="secondary" style={{margin: '1em'}}>
                + Create New Bet
                </Button>
            </div>

            <div>
                <Table bordered style={{color: 'white'}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Amount ($)</th>
                    <th>Status</th>
                    <th>Charity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>100</td>
                    <td>In progress</td>
                    <td>UNICEF</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>200</td>
                    <td>Lost: donated</td>
                    <td>UNICEF</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>500</td>
                    <td>Won</td>
                    <td>UNICEF</td>
                    </tr>
                </tbody>
                </Table>
            </div>
        </div>
     );
}

export default UserDash;
