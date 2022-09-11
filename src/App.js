// import logo from './logo.svg';
import logo from './metamask.svg'
import './App.css';
import {Button, Form} from 'react-bootstrap'

import Web3Modal from "web3modal";

import {useHistory} from 'react-router-dom';
import {ethers} from "ethers";
import {useEffect, useState} from "react";
import {getAccountFactory, toHex} from "./util";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateAccount from "./components/CreateAccount";


const zeroAddress = "0x0000000000000000000000000000000000000000";

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {}
});

function App() {
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
    const [accountAddress, setAccountAddress] = useState();
    const [factoryContractInstance, setFactoryContractInstance] = useState();
    const [signer, setSigner] = useState();

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            if (accounts) setAccount(accounts[0]);
            setChainId(network.chainId);

            console.log(accounts[0]);

            const tempSigner = await library.getSigner();
            setSigner(tempSigner);

            const factory = await getAccountFactory(library);
            const accountAddy = await factory.accounts(accounts[0])
            console.log(accountAddy);

            setFactoryContractInstance(factory);
            setAccountAddress(accountAddy);
        } catch (error) {
            console.error(error)
            setError(error);
        }
    };

    const handleNetwork = (e) => {
        const id = e.target.value;
        setNetwork(Number(id));
    };

    const handleInput = (e) => {
        const msg = e.target.value;
        setMessage(msg);
    };

    // const switchNetwork = async () => {
    //     try {
    //         await library.provider.request({
    //             method: "wallet_switchEthereumChain",
    //             params: [{ chainId: toHex(network) }]
    //         });
    //     } catch (switchError) {
    //         if (switchError.code === 4902) {
    //             try {
    //                 await library.provider.request({
    //                     method: "wallet_addEthereumChain",
    //                     params: [networkParams[toHex(network)]]
    //                 });
    //             } catch (error) {
    //                 setError(error);
    //             }
    //         }
    //     }
    // };

    const signMessage = async () => {
        if (!library) return;
        try {
            const signature = await library.provider.request({
                method: "personal_sign",
                params: [message, account]
            });
            setSignedMessage(message);
            setSignature(signature);
        } catch (error) {
            setError(error);
        }
    };

    const verifyMessage = async () => {
        if (!library) return;
        try {
            const verify = await library.provider.request({
                method: "personal_ecRecover",
                params: [signedMessage, signature]
            });
            setVerified(verify === account.toLowerCase());
        } catch (error) {
            setError(error);
        }
    };

    const refreshState = () => {
        setAccount();
        setChainId();
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
    };

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            const handleChainChanged = (_hexChainId) => {
                setChainId(_hexChainId);
            };

            const handleDisconnect = () => {
                console.log("disconnect", error);
                disconnect();
            };

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("chainChanged", handleChainChanged);
            provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener("accountsChanged", handleAccountsChanged);
                    provider.removeListener("chainChanged", handleChainChanged);
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider]);

    if (!account) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 style={{fontSize: '3em', color: '#f56c42'}}>SmartBet</h1>
                    <img src={logo} style={{cursor: "pointer", marginBottom: "1rem"}}/>
                    <Button onClick={connectWallet}>Connect Wallet</Button>
                    <a href={"https://metamask.io/download/"} style={{fontSize: '0.5em', marginTop: '3em'}}>METAMASK Chrome extension</a>
                </header>
            </div>
        );
    } else {
        if (!accountAddress || accountAddress === zeroAddress) {
            return (
                <div className="App">
                    <header className="App-header">
                        <CreateAccount setNewAccountAddress={setAccountAddress} factoryInstance={factoryContractInstance} signer={signer}/>
                        <Button onClick={disconnect}>Disconnect Wallet</Button>
                    </header>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <Dashboard web3Provider={library} accountAddress={accountAddress}/>
                        <Button variant="danger" onClick={disconnect} style={{marginBottom: "1em"}}>Disconnect Wallet</Button>
                    </header>
                </div>
            );
        }
    }
}

export default App;
