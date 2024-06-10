import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableHead, Paper, Button, Pagination, TableBody, TableRow, Rating, TextField } from '@mui/material';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { Spinner, Modal, Label, Checkbox } from 'keep-react';
import { Check, Trash, X } from 'phosphor-react';
import { Chat, Pending } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
    feedback: yup.string().required("Feedback is required"),
});

const ManageCampsOfParticipant = () => {
    const { setModelHead, setModelMessage, openSuccessModal, openErrorModal, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [isDeleteboxChecked, setIsDeleteboxChecked] = useState(false);
    const [isFeedBackOpen, setIsFeedBackOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const openFeedBackModal = () => {
        setIsFeedBackOpen(true);
    };
    const closeFeedBackModal = () => {
        setIsFeedBackOpen(false);
    };
    const [page, setPage] = useState(1);
    const listPerPage = 8;

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setIsDeleteboxChecked(false);
    };
    const url = `https://medicamp-server-tau.vercel.app/my-registration-camps/${user?.uid}`;

    const { isLoading, refetch, error, data: camps = [] } = useQuery({
        queryKey: [url],
        queryFn: async () => {
            try {
                const response = await fetch(url, { credentials: "include" });
                const data = await response.json();
                return Array.isArray(data) ? data : []; // Ensure data is an array or default to []
            } catch (error) {
                console.error('Error fetching data:', error);
                return []; // Return empty array on error
            }
        }
    });
    

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            rating: 5,
            feedback: "",
        }
    });

    const handleFeedback = async (data) => {
      
        const send = {
            name : user?.displayName ,
            email: user?.email,
            userUID: user?.uid,
            userPhotoURL : user?.photoURL ,
            rating: data?.rating ,
            feedback : data?.feedback,
            
        }
        try {
          await  axios.post('https://medicamp-server-tau.vercel.app/feedback',send)
          setModelHead("SENT")
          setModelMessage("feedback sent successful")
          openSuccessModal() ;
          closeFeedBackModal()
            
        } catch (error) {
            setModelHead("faild")
            setModelMessage(error.message)
            openErrorModal()
            
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://medicamp-server-tau.vercel.app/registered-campUser/${deleteID}`);
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
            navigate(`/dashboard/payment/${Id}`);
        } catch (error) {
            setModelHead("Payment failed");
            setModelMessage(error.message);
            openErrorModal();
        }
    };

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading data... please try again later.</div>;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCamps = camps?.filter((camp) =>
        camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.dateTime.includes(searchTerm) ||
        camp.healthcareProfessional.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const start = (page - 1) * listPerPage;
    const paginatedCamps = filteredCamps.slice(start, start + listPerPage);

    return (
        <>
            <TextField
                label="Search Camps"
                variant="outlined"
               className=' lg:w-1/3 md:w-1/2 w-full  '
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Modal isOpen={isFeedBackOpen} onClose={closeFeedBackModal}>
                <Modal.Body className="flex w-[30rem] flex-col items-center p-6 lg:p-8">
                    <div className="h-20 w-20 border text-xs p-5 flex justify-center items-center rounded-full border-blue-100 bg-blue-50 text-blue-500">
                        Feedback
                    </div>
                    <form onSubmit={handleSubmit(handleFeedback)} className='flex mt-5 flex-col gap-5 justify-center items-center'>
                        <Controller
                            name="rating"
                            control={control}
                            render={({ field }) => (
                                <Rating
                                    {...field}
                                    value={field.value}
                                    onChange={(event, newValue) => field.onChange(newValue)}
                                    precision={1}
                                />
                            )}
                        />
                        <TextField
                            fullWidth
                            id="feedback"
                            label="Feedback"
                            name="feedback"
                            autoComplete="feedback"
                            className='apple'
                            error={Boolean(errors.feedback?.message)}
                            helperText={errors.feedback?.message}
                            {...register("feedback")}
                        />
                        <Button type='submit' size="sm" className='!bg-blue-50 !border-2 !border-blue-100' color="primary">
                            Send
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
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
                            <TableCell>Feedback</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCamps.map((camp) => (
                            <TableRow key={camp._id}>
                                <TableCell>{camp.name}</TableCell>
                                <TableCell>{camp.fees}</TableCell>
                                <TableCell>{camp.ParticipantName}</TableCell>
                                <TableCell>
                                    {camp.paymentStatus ? <Button>Paid</Button> : (
                                        <Button onClick={() => handlePayment(camp._id)}>
                                            Pay
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {camp.confirmationStatus === "confirmed" ? "Confirmed" : "Pending"}
                                </TableCell>
                                <TableCell>
                                    {camp?.confirmationStatus === "confirmed" && camp?.paymentStatus === "paid" ? (
                                        <Button>
                                            <Check className='font-bold p-1 text-green-600' size={30} />
                                        </Button>
                                    ) : (
                                        <Button onClick={() => { openModal(); setDeleteID(camp._id); }} disabled={camp.paymentStatus === "paid"}>
                                            {
                                                camp.paymentStatus === "paid" ? <Pending color='red' size={18} /> : <X color='red' size={18} />
                                            }
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button disabled={camp?.confirmationStatus !== "confirmed" || camp?.paymentStatus !== "paid"} onClick={openFeedBackModal} style={{ marginLeft: '10px' }}>
                                        <Chat />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={Math.ceil(filteredCamps.length / listPerPage)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary"
                    className="flex justify-center my-5"
                />
            </TableContainer>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3">
                    <Modal.Icon>
                        <Trash color='red' size={28} />
                    </Modal.Icon>
                    <Modal.Content>
                        <div className="!mb-6">
                            <h3 className="mb-2 text-body-1 font-medium apple text-[#141414]">Warning</h3>
                            <p className="text-body-4 font-normal apple text-[#1a1a1a]">
                                Are you sure you want to cancel the registration of this camp? This action cannot be undone.
                            </p>
                        </div>
                        <fieldset className="mb-3 flex items-center gap-2 apple">
                            <Checkbox
                                id="checkbox"
                                checked={isDeleteboxChecked}
                                onChange={(event) => { setIsDeleteboxChecked(event.target.checked); console.log(event.target.checked) }}
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
