import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'


const SponsorDash = () => {
    return (
        <div>
            <Table bordered style={{color: 'white'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Amount ($)</th>
                    <th>Status</th>
                    <th>Charity</th>
                    <th>Approval</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>100</td>
                    <td>In progress</td>
                    <td>UNICEF</td>
                    <td>
                        <Button variant="success" style={{margin: "0 3px"}}>Release</Button>
                        <Button variant="warning" style={{margin: "0 3px"}}>Donate</Button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>200</td>
                    <td>Lost: donated</td>
                    <td>UNICEF</td>
                    <td>
                        <Button variant="success" style={{margin: "0 3px"}}>Release</Button>
                        <Button variant="warning" style={{margin: "0 3px"}}>Donate</Button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>500</td>
                    <td>Won</td>
                    <td>UNICEF</td>
                    <td>
                        <Button variant="success" style={{margin: "0 3px"}}>Release</Button>
                        <Button variant="warning" style={{margin: "0 3px"}}>Donate</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
            <p>UNICEF: 0x817838ab98f50f87917359a918cb7e57c07f9fa4</p>
        </div>
     );
}

export default SponsorDash;
