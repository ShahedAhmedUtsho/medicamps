import  { useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Spinner, Button } from 'keep-react';

const validationSchema = yup.object().shape({
    name: yup.string().required("Camp name is required"),
    image: yup.string().url("Invalid URL format").required("Image URL is required"),
    fees: yup.number().required("Fees are required").min(0, "Fees cannot be negative"),
    dateTime: yup.string().required("Date is required"),
    location: yup.string().required("Location is required"),
    healthcareProfessional: yup.string().required("Healthcare professional is required"),
    description: yup.string().required("Description is required"),
    participantCount: yup.number()
});

const UpdateCamp = () => {
    const { id } = useParams();
    const { setModelHead, setModelMessage, openSuccessModal, openErrorModal } = useContext(AuthContext);
    const url = `http://localhost:3000/camp-details/${id}`;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            image: "",
            fees: 0,
            dateTime: "",
            location: "",
            healthcareProfessional: "",
            description: "",
            participantCount: 0,
        }
    });

    const { isLoading, error, data: campData } =
    
    useQuery({ 
        queryKey: [url],
        queryFn: async () => {
        const response = await fetch(url);
        return response.json();
    },
    });

    useEffect(() => {
        if (campData) {
            reset(campData);
        }
    }, [campData, reset]);

    const handleUpdateCamp = async (data) => {
        const formattedData = {
            ...data,
            dateTime: new Date(data.dateTime).toISOString().slice(0, 10), // Format date to exclude time
        };

        const noChangesMade = Object.keys(data).every(
            key => data[key] === campData[key]
        );

        if (noChangesMade) {
            setModelHead("Error");
            setModelMessage("You didn't change anything");
            openErrorModal();
            return;
        }

        try {
            await axios.put(url, formattedData);

            setModelHead("Successful");
            setModelMessage("Camp updated successfully");
            openSuccessModal();

        } catch (error) {
            console.error('Error updating camp:', error);
            setModelHead("Error");
            setModelMessage("Error updating camp. Please try again.");
            openErrorModal();
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error loading camp details</div>;
    }

    return (
        <div className='w-full min-h-[600px] box-shadow rounded-lg overflow-hidden'>
            <div className='w-full relative rounded-xl md:h-[24vw] h-[12vh] lg:h-[18vw] max-h-[300px]'>
                <h2 className='md:text-4xl right-0 left-0 mx-auto top-0 bottom-0 flex justify-center items-center absolute text-center apple font-bold bg-slate-700 capitalize text-slate-200 bg-opacity-40'>Update Camp</h2>
            </div>

            <form onSubmit={handleSubmit(handleUpdateCamp)} className='flex flex-col gap-5 py-5 px-5'>
                <TextField
                    fullWidth
                    id="name"
                    label="Camp Name"
                    name="name"
                    autoComplete="name"
                    className='apple'
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    {...register("name")}
                />
                <TextField
                    fullWidth
                    id="image"
                    label="Image URL"
                    name="image"
                    autoComplete="image"
                    className='apple'
                    error={Boolean(errors.image?.message)}
                    helperText={errors.image?.message}
                    {...register("image")}
                />
                <TextField
                    fullWidth
                    id="fees"
                    label="Fees"
                    name="fees"
                    type="number"
                    autoComplete="fees"
                    className='apple'
                    error={Boolean(errors.fees?.message)}
                    helperText={errors.fees?.message}
                    {...register("fees")}
                />
                <TextField
                    fullWidth
                    id="dateTime"
                    name="dateTime"
                    type="date"
                    className='apple'
                    error={Boolean(errors.dateTime?.message)}
                    helperText={errors.dateTime?.message}
                    {...register("dateTime")}
                />
                <TextField
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="location"
                    className='apple'
                    error={Boolean(errors.location?.message)}
                    helperText={errors.location?.message}
                    {...register("location")}
                />
                <TextField
                    fullWidth
                    id="healthcareProfessional"
                    label="Healthcare Professional"
                    name="healthcareProfessional"
                    autoComplete="healthcareProfessional"
                    className='apple'
                    error={Boolean(errors.healthcareProfessional?.message)}
                    helperText={errors.healthcareProfessional?.message}
                    {...register("healthcareProfessional")}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    className='apple'
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}
                    {...register("description")}
                />
                <TextField
                    fullWidth
                    id="participantCount"
                    label="Participant Count"
                    name="participantCount"
                    type="number"
                    autoComplete="participantCount"
                    className='apple'
                    error={Boolean(errors.participantCount?.message)}
                    helperText={errors.participantCount?.message}
                    {...register("participantCount")}
                />
                <Button type='submit' className='mt-10'>Update Camp</Button>
            </form>
        </div>
    );
};

export default UpdateCamp;
