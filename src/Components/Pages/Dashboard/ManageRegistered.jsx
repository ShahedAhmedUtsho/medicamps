import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Button } from '@mui/material';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Spinner, Modal, Label, Checkbox } from 'keep-react';
import { ArrowRight, Check, Pen, Trash, X } from 'phosphor-react';

const ManageRegisteredCamps = () => {
    const { setModelHead, setModelMessage, openSuccessModal, openErrorModal } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isConOpen, setIsConOpen] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [campId, setCampId] = useState("");
    campId
    const [isDeleteboxChecked, setIsDeleteboxChecked] = useState(false);

    const openModal = () => setIsOpen(true);
    const openConModal = () => setIsConOpen(true);
    const closeModal = () => {
        setIsConOpen(false)
        setIsOpen(false);
        setIsDeleteboxChecked(false);
    };

    const { isLoading, refetch, error, data: registeredCamps } = useQuery({
        queryKey: ["registeredCamps"],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/registered-campUser');
            return response.data;
        }
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/registered-campUser/${deleteID}`);
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
   
    const handleConfirmation = async (campId) => {
        try {
            await axios.patch(`http://localhost:3000/registered-campUser/${campId}`, { confirmationStatus: "confirmed" , campId });
            closeModal()
            refetch();
        } catch (error) {
            setModelHead("Confirmation failed");
            setModelMessage(error.message);
            openErrorModal();
        }
    };


    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data... please try again later.</div>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="registered camps table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Participant Name</TableCell>
                            <TableCell>Camp Name</TableCell>
                            <TableCell>Camp Fees</TableCell>
                          
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Confirmation Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registeredCamps.map((camp) => (
                            <TableRow key={camp._id}>
                                 <TableCell>{camp.ParticipantName}</TableCell>
                                <TableCell>{camp.name}</TableCell>
                                <TableCell>{camp.fees}</TableCell>
                               
                                <TableCell>{camp.paymentStatus ? <p className='font-bold p-[6px]'>Paid</p> : "Unpaid"}</TableCell>
                                <TableCell>
                                    {camp?.confirmationStatus === "confirmed" ? <p className='font-bold p-[6px]'>Confirmed</p>  : (
                                        <Button className='!bg-slate-200'  onClick={() => 
                                           {
                                            setCampId(camp._id)
                                            openConModal()
                                           }



                                        }>
                                            Pending
                                        </Button>
                                    )}
                                    
                                </TableCell>
                                <TableCell>

{ camp?.confirmationStatus === "confirmed" && camp?.paymentStatus ? <Button> <Check className=' font-bold p-1 text-green-600' size={30} /></Button>  :   <Button onClick={() => { openModal(); setDeleteID(camp._id); }} disabled={!!camp?.paymentStatus ==="paid" && !!camp?.confirmationStatus === "confirmed"}>
                                        <X color='red' size={18} />
                                    </Button>

}



                                  



                                   
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <X color='red' size={28} />
                    </Modal.Icon>
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900">Warning</h3>
                            <p className="text-body-4 font-normal text-metal-600">
                                Are you sure you want Reject the Registration ? This action cannot be undone.
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
                        <Button disabled={!isDeleteboxChecked} onClick={() => { handleDelete(); closeModal(); }} size="sm" color="error">
                           Confirm
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>


            <Modal isOpen={isConOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <Check color='green' size={28} />
                    </Modal.Icon>
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900"> confirm</h3>
                            <p className="text-body-4 font-normal text-metal-600">
                               Did you get payment? I want to confirm.
                            </p>
                        </div>
                        <fieldset className="mb-3 flex items-center gap-2">
                                  
                        </fieldset>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button onClick={closeModal} size="sm" variant="outline" color="secondary">
                            Cancel
                        </Button>
                        <Button  onClick={() => { handleConfirmation(campId); closeModal(); }} size="sm" color="primary">
                           Confirm
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ManageRegisteredCamps;
