import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'
import {useEffect, useState} from "react";
import {getBankAccount} from "../../util";
import {ethers} from "ethers";
import CreateBet from "./CreateBet";

const UserDash = ({web3Provider, accountAddress}) => {
    const [checkingBal, setCheckingBal] = useState("0");
    const [savingsBal, setSavingsBal] = useState("0");
    const [betCounter, setBetCounter] = useState(0);
    const [bets, setBets] = useState([]);


    useEffect(() => {
        async function prep() {
            try {
                const smartAccount = getBankAccount(accountAddress, web3Provider);
                const checkingRemaining = await smartAccount.checkingAmt();
                const savingsRemaining = await smartAccount.savingsAmt();
                const betCount = await smartAccount.betCounter();
                console.log(`Checking: ${checkingRemaining}, Savings: ${savingsRemaining}, BetCount: ${betCount}`)

                if (checkingRemaining > 0) setCheckingBal(ethers.utils.formatEther(checkingRemaining));
                if (savingsRemaining > 0) setSavingsBal(ethers.utils.formatEther(savingsRemaining));
                if (betCount > 0) {
                    setBetCounter(betCount)

                    const bets = []
                    for (let i = 1; i <= betCount; i++) {
                        const bet = await smartAccount.bets(i);
                        console.log("Bet found:", bet);
                        bets.push(bet);
                    }
                    setBets(bets);
                }
            } catch (e) {
                console.error(e);
            }
        }

        prep();
    }, []);

    return (
        <div>
            <div className="status-cards">
                <Card className="balance-card">
                    <Card.Body>
                        <Card.Title style={{color: 'black', 'font-size': '5rem'}}>Chequing</Card.Title>
                        <Card.Text style={{color: 'black', 'font-size': '3rem'}}>ETH {checkingBal}</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="balance-card">
                    <Card.Body>
                        <Card.Title style={{color: 'black', 'font-size': '5rem'}}>Saving</Card.Title>
                        <Card.Text style={{color: 'black', 'font-size': '3rem'}}>ETH {savingsBal}</Card.Text>
                    </Card.Body>
                </Card>
                <CreateBet/>
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
                    {
                        bets.map((bet, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>bet.amount</td>
                                    <td>bet.state</td>
                                    <td>UNICEF</td>
                                </tr>
                            )
                        })
                    }
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
