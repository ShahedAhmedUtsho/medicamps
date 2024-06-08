import  { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Button } from '@mui/material';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Spinner } from 'keep-react';

const Allpayment = () => {
    const { setModelHead, setModelMessage,  openErrorModal } = useContext(AuthContext);
    
   

    const { isLoading, refetch, error, data: payments } = useQuery({
        queryKey: ['http://localhost:3000/payments'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/payments');
            return response.data;
        }
    });





    const handleConfirmation = async (campID) => {
       
       
          axios.patch(`http://localhost:3000/allpayment`, { confirmationStatus: "confirmed", campID })
          .then(res => {
            console.log(res)
            refetch();

           


           
          }).catch(

            err =>{
                setModelHead("Confirmation failed");
            setModelMessage(err.message);
            openErrorModal();
            }
          )
           

       
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
                    {payments.map((payment) => (
                        <TableRow key={payment._id}>
                            <TableCell>{payment.ParticipantName}</TableCell>
                            <TableCell>{payment.camp_name}</TableCell>
                            <TableCell>{payment.transactionID}</TableCell>
                            <TableCell>{payment.fees}</TableCell>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>
                                {payment?.confirmationStatus === "confirmed"  ? "Confirmed" : 
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
        </TableContainer>
    );
};

export default Allpayment;
