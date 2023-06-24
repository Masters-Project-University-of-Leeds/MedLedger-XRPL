import './registration.scss';

import { Button, Image, Input, Message } from 'semantic-ui-react';
import { createWebSocketConnection, generateAccount, generateQRForPayment } from '../../api/xrpl';
import { useCallback, useState } from 'react';

import { toast } from 'react-toastify';

const NFTOrderComponent = () => {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState(null);
    const [userDetails, setUserDetails] = useState({
        name: '',
        hospital: '',
    });
    const [qr, setQR] = useState({
        png: null,
        id: null,
    });

    const handleGenerateAccount = useCallback(async () => {
        setLoading(true);
        try {
            const newAccount = await generateAccount();
            console.log('New account:', newAccount);
            setAccount(newAccount);
        } catch (error) {
            console.log('Error generating account:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    }, []);

    const handleQRGeneration = useCallback(async () => {
        setLoading(true);
        try {
            const payment = await generateQRForPayment({ account: account.address, ...userDetails });
            setQR({ png: payment.data.refs.qr_png });
            const response = await createWebSocketConnection(payment);

            if (!response) {
                setQR({
                    png: null,
                    id: null,
                });
                return;
            }
            setQR({ id: response.data.txid });
        } catch (error) {
            console.log('Error generating Ticket:', error);
            toast.error('Error Generating Ticket');
        } finally {
            setLoading(false);
        }
    }, [account?.address, userDetails]);

    return (
        <div className="nft-order-container">
            <div className="general-information">
                <h3>Registration Steps:</h3>
                <ul className="account-detail-list">
                    <li>Download & Open XUMM/XAMAN App</li>
                    <li>Click the Generate New Account button</li>
                    <li>
                        Enter the seed value in XUMM/XAMAN App (This will be used to approve & generate your ticket)
                    </li>
                    <li>Click the Generate QR Code button</li>
                    <li>Tap the middle button in your app to scan the QR code</li>
                    <li>Slide to approve the request.</li>
                </ul>
            </div>
            {account ? (
                <div className="account-details">
                    <Message positive>
                        <Message.Header>New Account Details</Message.Header>
                        <p>Account Address: {account.address}</p>
                        <p>Account Seed: {account.seed}</p>
                    </Message>
                    <div className="user-details">
                        <h3>Please Enter Your details:</h3>
                        <div className="user-details-input">
                            <div className="user-details-input-item">
                                <label htmlFor="name">Name</label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={userDetails.name}
                                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                />
                            </div>
                            <div className="user-details-input-item">
                                <label htmlFor="hospital">Hospital</label>
                                <Input
                                    id="hospital"
                                    placeholder="Enter your hospital"
                                    value={userDetails.hospital}
                                    onChange={(e) => setUserDetails({ ...userDetails, hospital: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    {qr.png ? (
                        <Image src={qr.png} />
                    ) : (
                        <Button primary disabled={loading} onClick={handleQRGeneration}>
                            {loading ? 'Generating...' : 'Generate QR Code'}
                        </Button>
                    )}
                </div>
            ) : (
                <Button primary disabled={loading} onClick={handleGenerateAccount}>
                    Generate New Account
                </Button>
            )}
            {qr.id && (
                <div className="nft-details">
                    <Message positive>
                        <Message.Header>Ticket Details</Message.Header>
                        <p>Ticket ID: {qr.id}</p>
                    </Message>
                </div>
            )}
        </div>
    );
};

export default NFTOrderComponent;
