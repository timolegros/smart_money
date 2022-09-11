import {Button, Form, Card, Table, Tabs, Tab} from 'react-bootstrap'
import {useEffect, useState} from "react";
import {getBankAccount} from "../../util";
import {ethers} from "ethers";
import CreateBet from "./CreateBet";

const UserDash = ({web3Provider, accountAddress, signer}) => {
    const [checkingBal, setCheckingBal] = useState("0");
    const [savingsBal, setSavingsBal] = useState("0");
    const [betCounter, setBetCounter] = useState(0);
    const [bets, setBets] = useState([]);

    const getState = (val) => {
        if (val === 0) return "In-progress"
        else if (val === 1) return "Won"
        else return "Lost"
    }


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
                <CreateBet web3Provider={web3Provider} accountAddress={accountAddress} signer={signer}/>
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
                                    <td>{bet.amount.toNumber()}</td>
                                    <td>{getState(bet.state)}</td>
                                    <td>UNICEF</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <p>UNICEF: 0x817838ab98f50f87917359a918cb7e57c07f9fa4</p>
            </div>
        </div>
    );
}

export default UserDash;
