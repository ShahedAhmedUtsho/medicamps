import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Button, Pagination } from '@mui/material';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';

const Allpayment = () => {
    const { setModelHead, setModelMessage, openErrorModal } = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    const { isLoading, refetch, error, data: payments } = useQuery({
        queryKey: ['http://localhost:3000/payments'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/payments');
            return response.data;
        }
    });

    const handleConfirmation = async (campID) => {
        try {
            await axios.patch(`http://localhost:3000/allpayment`, { confirmationStatus: "confirmed", campID });
            refetch();
        } catch (err) {
            setModelHead("Confirmation failed");
            setModelMessage(err.message);
            openErrorModal();
        }
    };

    const formatDate = (dateString) => {
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
    if (error) return <div>Error loading data... please try again later.</div>;

    const start = (page - 1) * rowsPerPage;
    const paginatedPayments = payments.slice(start, start + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="registered camps table">
                <TableHead>
                    <TableRow>
                        <TableCell>Participant Name</TableCell>
                        <TableCell>Camp Name</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Fees</TableCell>
                        <TableCell>Payment Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedPayments.map((payment) => (
                        <TableRow key={payment._id}>
                            <TableCell>{payment.ParticipantName}</TableCell>
                            <TableCell>{payment.camp_name}</TableCell>
                            <TableCell>{payment.transactionID}</TableCell>
                            <TableCell>{payment.fees}</TableCell>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>
                                {payment.confirmationStatus === "confirmed" ? "Confirmed" : 
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleConfirmation(payment.campID)}
                                >
                                    Confirm
                                </Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                count={Math.ceil(payments.length / rowsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
                className="flex justify-center my-5"
            />
        </TableContainer>
    );
};

export default Allpayment;
