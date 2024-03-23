import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/mpesa/stkpush', {
                BusinessShortCode: 'YOUR_BUSINESS_SHORT_CODE',
                Password: 'YOUR_PASSWORD',
                Timestamp: 'YOUR_TIMESTAMP',
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: 'YOUR_PAYBILL_NUMBER',
                PhoneNumber: phoneNumber,
                CallBackURL: 'http://your_callback_url.com',
                AccountReference: 'YOUR_ACCOUNT_REFERENCE',
                TransactionDesc: 'Test payment'
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto mt-10 bg-green-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center mb-6">M-Pesa Payment</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input 
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Amount
                    </label>
                    <input 
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:text-sm"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
