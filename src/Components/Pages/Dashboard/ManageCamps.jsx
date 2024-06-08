import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Table, 
    TableCell,
    TableContainer, TableHead, TableBody,
    TableRow, Paper,   Button, 
    Pagination } from '@mui/material';
import { AuthContext,  } from      '../../../AuthProvider/AuthProvider';
import {
    Spinner,
    Checkbox,
    Modal, 
    Label,
      } from  'keep-react';
import { 
    ArrowRight,
    Pen, 
    Trash
 } from  'phosphor-react';

const ManageCamps = () => {
    const { setModelHead, setModelMessage, openSuccessModal, openErrorModal } = useContext(AuthContext);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const [deleteID, setDeleteID] = useState("");

    const [isDeleteboxChecked, setIsDeleteboxChecked] = useState(false);
    const [page, setPage] = useState(1);
    const atlist  = 8;

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setIsDeleteboxChecked(false);
    };

    const { isLoading, refetch, error, data: camps } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
            const response  =  await  axios.get('http://localhost:3000/camps');
            return response.data;
        }
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/camps/${deleteID}`);
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

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data... please try again later.</div>;

   
    const start = (page - 1) * atlist;
    const paginatedCamps = camps.slice(start, start + atlist);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="camps table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Healthcare Professional</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCamps.map((camp) => (
                            <TableRow key={camp._id}>
                                <TableCell>{camp.name}</TableCell>
                                <TableCell>{new Date(camp.dateTime).toLocaleString()}</TableCell>
                                <TableCell>{camp.location}</TableCell>
                                <TableCell>{camp.healthcareProfessional}</TableCell>
                                <TableCell>

                                    <Link className="!apple text-black  " to={`/dashboard/update-camp/${camp._id}`}>
                                        <Button className="mr-[10px] apple" >
                                            <Pen size={18} />
                                        </Button>
                                    </Link>

                                    <Button onClick={() => { openModal(); setDeleteID(camp._id); }}>
                                        <Trash color='red' size={18} />
                                    </Button>
                                    <Link className="!apple text-black  " to={`/camp-details/${camp._id}`}>
                                        <Button className="mr-[10px] apple ">
                                            <ArrowRight className='border apple  p-1 rounded-full border-black ' size={24} />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={Math.ceil(camps.length / atlist)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary"
                    className="flex appple justify-center my-5 mx-0"
                   
                />
            </TableContainer>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <Trash color='red' size={28} />
                    </Modal.Icon>
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium text-metal-900"> 
                                Warning...
                                </h3>
                            <p className="text-body-4 font-normal text-metal-600">
                                Are you sure you want to delete this? This action cannot be undone.
                            </p>
                        </div>
                        <fieldset className="mb-3 flex items-center gap-2">
                            <Checkbox
                                id="checkbox"
                                checked={isDeleteboxChecked}
                                onChange={(e) => { setIsDeleteboxChecked(e.target.checked); console.log(e.target.checked); }}
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
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ManageCamps;
