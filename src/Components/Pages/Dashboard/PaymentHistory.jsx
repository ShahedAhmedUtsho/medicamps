import  { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import { Spinner } from 'keep-react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const { isLoading, error, data: payments,} = useQuery({
        queryKey: [`http://localhost:3000/payments/${user?.uid}`],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/payments/${user?.uid}`);
            return response.data;
        }
    });

 





    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data... Check your Network .</div>;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="payment history table">
                <TableHead>
                    <TableRow>
                        <TableCell>Participant Name</TableCell>
                        <TableCell>Camp Name</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Fees</TableCell>
                        <TableCell>Payment Date</TableCell>
                        <TableCell>Confirmation Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment._id}>
                            <TableCell>{payment.ParticipantName}</TableCell>
                            <TableCell>{payment.camp_name}</TableCell>
                            <TableCell>{payment.transactionID}</TableCell>
                            <TableCell>{payment.fees}</TableCell>
                            <TableCell>{formatDate(payment?.date)}</TableCell>
                            <TableCell>{payment.confirmationStatus === "confirmed" ? 'Confirmed' : 'Pending'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PaymentHistory;
