import React from 'react';
import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'
import UserDash from "./UserDash";
import SponsorDash from "./SponsorDash";

export default function Dashboard() {
    return (
    <div className="Dashboard">
        <Tabs defaultActiveKey="user" fill>
            <Tab eventKey="user" title="User">
                <UserDash />
            </Tab>
            <Tab eventKey="sponsor" title="Sponsor" style={{color: 'white'}}>
                <SponsorDash />
            </Tab>
        </Tabs>

    </div>
    );
}
