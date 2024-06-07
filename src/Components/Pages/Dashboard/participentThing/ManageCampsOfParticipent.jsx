import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Button } from '@mui/material';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { Spinner, Modal, Label, Checkbox } from 'keep-react';
import { ArrowRight, Check, Pen, Trash, X } from 'phosphor-react';

const ManageCampsOfParticipant = () => {
    const { setModelHead, setModelMessage, openSuccessModal, openErrorModal,user } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [isDeleteboxChecked, setIsDeleteboxChecked] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setIsDeleteboxChecked(false);
    };

    const { isLoading, refetch, error, data: camps } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/my-registration-camps/${user.uid}`); // Update the URL as needed
            return response.data;
        }
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/registered-camps/${deleteID}`); // Update the URL as needed
            setModelHead("Deleted");
            setModelMessage("Deleted successfully");
            openSuccessModal();
            refetch();
            closeModal();
        } catch (error) {
            setModelHead("Delete failed");
            setModelMessage(error.message);
            openErrorModal();
        }
    };

    const handlePayment = async (Id) => {
        try {
            // Redirect to payment page (implementation depends on your payment setup)
            navigate(`/dashboard/payment/${Id}`);
        } catch (error) {
            setModelHead("Payment failed");
            setModelMessage(error.message);
            openErrorModal();
        }
    };

    const handleFeedback = async (campId) => {
        navigate(`/feedback/${campId}`);
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data... please try again later.</div>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="camps table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Camp Name</TableCell>
                            <TableCell>Camp Fees</TableCell>
                            <TableCell>Participant Name</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Confirmation Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {camps.map((camp) => (
                            <TableRow key={camp._id}>
                                <TableCell>{camp.name}</TableCell>
                                <TableCell>{camp.fees}</TableCell>
                                <TableCell>{camp.ParticipantName}</TableCell>
                                <TableCell>
                                    {camp.paymentStatus ? "Paid" : (
                                        <Button onClick={() => handlePayment(camp._id)}>
                                            Pay
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {camp.confirmationStatus === "confirmed" ? "Confirmed" : "Pending"}
                                </TableCell>
                                <TableCell>
                                { camp?.confirmationStatus === "confirmed" && camp?.paymentStatus ? <Button> <Check className=' font-bold p-1 text-green-600' size={30} /></Button>  :     <Button onClick={() => { openModal(); setDeleteID(camp._id); }} disabled={!!camp.paymentStatus}>
                                     <X color='red' size={18} />
                                 </Button>
}
                                  
                                    {camp.paymentStatus && camp.confirmationStatus === "Confirmed" && (
                                        <Button onClick={() => handleFeedback(camp._id)} style={{ marginLeft: '10px' }}>
                                            Feedback
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <Trash color='red' size={28} />
                    </Modal.Icon>
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900">Warning</h3>
                            <p className="text-body-4 font-normal text-metal-600">
                                Are you sure you want to Cancel the registration this camp? This action cannot be undone.
                            </p>
                        </div>
                        <fieldset className="mb-3 flex items-center gap-2">
                            <Checkbox
                                id="checkbox"
                                checked={isDeleteboxChecked}
                                onChange={(e) => { setIsDeleteboxChecked(e.target.checked); console.log(e.target.checked) }}
                            />
                            <Label htmlFor="checkbox" className="text-body-4 font-normal text-metal-600">
                                I understand
                            </Label>
                        </fieldset>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={closeModal} size="sm" variant="outline" color="secondary">
                            Cancel
                        </Button>
                        <Button disabled={!isDeleteboxChecked} onClick={handleDelete} size="sm" color="error">
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ManageCampsOfParticipant;
