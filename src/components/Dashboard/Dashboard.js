import React from 'react';
import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'
import UserDash from "./UserDash";
import SponsorDash from "./SponsorDash";

export default function Dashboard({web3Provider, accountAddress}) {
    return (
    <div className="Dashboard">
        <Tabs defaultActiveKey="user" fill style={{marginTop: "1em"}}>
            <Tab eventKey="user" title="User">
                <UserDash web3Provider={web3Provider} accountAddress={accountAddress}/>
            </Tab>
            <Tab eventKey="sponsor" title="Sponsor" style={{color: 'white'}}>
                <SponsorDash />
            </Tab>
        </Tabs>

    </div>
    );
}
