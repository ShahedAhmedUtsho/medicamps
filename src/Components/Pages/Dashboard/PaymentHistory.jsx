import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    Table, TableCell, TableContainer, TableHead, TableBody,
    TableRow, Paper, Pagination, TextField
} from '@mui/material';
import { Spinner } from 'keep-react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const listPerPage = 8;

    const url = `https://medicamp-server-tau.vercel.app/payments/${user?.uid}`;

    const { isLoading, error, data: payments = [] } = useQuery({
        queryKey: [url],
        queryFn: async () => {
            try {
                const response = await fetch(url, { credentials: "include" });
                const data = await response.json();
                return Array.isArray(data) ? data : []; 
            } catch (error) {
                console.error('Error fetching data:', error);
                return []; 
            }
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
    if (error) return <div>Error loading data... Check your Network.</div>;

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPayments = payments?.filter(payment =>
        payment.ParticipantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.transactionID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatDate(payment.date).includes(searchQuery)
    );

    const start = (page - 1) * listPerPage;
    const paginatedPayments = filteredPayments.slice(start, start + listPerPage);

    return (
        <>
           <div className=''>
           <TextField
                label="Search Payment"
                variant="outlined"
              
                margin="normal"
                value={searchQuery}
                onChange={handleSearch}
                className=' lg:w-1/3 md:w-1/2 w-full  '
            />
           </div>
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
                        {paginatedPayments.map((payment) => (
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
                <Pagination
                    count={Math.ceil(filteredPayments.length / listPerPage)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary"
                    className="flex justify-center my-5"
                />
            </TableContainer>
        </>
    );
};

export default PaymentHistory;
