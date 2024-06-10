import  { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button } from 'keep-react';
import defaultCover from '../../../Assets/svg/profileCover.svg';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { updateProfile } from 'firebase/auth';
import Auth from '../../../FireBase/Firebase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [initialProfile, setInitialProfile] = useState(null);
    const navigate = useNavigate()
    const { user, setModelHead, setModelMessage, openSuccessModal, openErrorModal } = useContext(AuthContext);
    const url = `https://medicamp-server-tau.vercel.app/mediusers/${user?.uid}`;

    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string()
            .email("Invalid email format")
            .required("Email is required")
            .test('has-tld', 'Email must include a top-level domain', function(value) {
                return /\.[a-zA-Z]{2,}$/.test(value);
            }),
        photoURL: yup.string().required("Photo URL is required"),
        cover: yup.string().required("Cover URL is required"),
    });

    const { isLoading, error, data: profile } = useQuery({
        queryKey: [url],
        queryFn: async () => {
            const response = await fetch(url,{credentials:"include"});
            return response.json();
        },
    });


console.log(profile)
console.log(url)


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            photoURL: "",
            cover: "",
            email: "",
            number: "",
            description: "",
            head: ""
        }
    });

    useEffect(() => {
        if (profile || user) {
            const profileData = {
                name: profile?.name || user?.displayName,
                email: profile?.email || user?.email,
                description: profile?.description || "",
                number: profile?.number || "",
                photoURL: profile?.photoURL || user?.photoURL,
                cover: profile?.cover || defaultCover,
                head: profile?.head || "Add profile head"
            };
            setInitialProfile(profileData);
            reset(profileData);
        }
    }, [profile, reset, user]);

    const handleUpdate = async (data) => {
        const noChangesMade = Object.keys(data).every(
            key => data[key] === initialProfile[key]
        );

        if (noChangesMade) {
            setModelHead("Error");
            setModelMessage("You didn't change anything");
            openErrorModal();
            return;
        }

        try {
            await updateProfile(Auth.currentUser, {
                displayName: data.name,
                photoURL: data.photoURL,
            });

            await axios.put(url, {
                
                name: data.name,
                email:data.email,
                head:data.head,
                photoURL: data.photoURL,
                cover: data.cover,
                number: data.number,
                description: data.description,
               
                
            });

            setModelHead("Successful");
            setModelMessage("Profile updated successfully");
            openSuccessModal();
            navigate('/dashboard')
        } catch (err) {
            console.error("Error updating profile:", err.message);
            setModelHead("Error");
            setModelMessage("Error updating profile. Please try again.");
            openErrorModal();
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error loading profile</div>;
    }

    return (
        <div className='w-full min-h-[600px] box-shadow rounded-lg overflow-hidden'>
            <div className='w-full relative rounded-xl md:h-[24vw] h-[12vh] lg:h-[18vw] max-h-[300px]'>
                <img src={profile?.cover || defaultCover} alt="" className='w-full h-full object-cover' />
                <h2 className='md:text-4xl right-0 left-0 mx-auto top-0 bottom-0 flex justify-center items-center absolute text-center apple font-bold bg-slate-700 capitalize text-slate-200 bg-opacity-40'>Update Profile</h2>
            </div>

            <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col gap-5 py-5 px-5'>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    className='apple'
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    {...register("name")}
                />
                <TextField
                    fullWidth
                    id="photoURL"
                    label="Profile Photo"
                    name="photoURL"
                    autoComplete="Profile Photo"
                    className='apple'
                    error={Boolean(errors.photoURL?.message)}
                    helperText={errors.photoURL?.message}
                    {...register("photoURL")}
                />
                <TextField
                    fullWidth
                    id="cover"
                    label="Cover Photo"
                    name="cover"
                    autoComplete="Cover Photo"
                    className='apple'
                    error={Boolean(errors.cover?.message)}
                    helperText={errors.cover?.message}
                    {...register("cover")}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    className='apple'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email")}
                />
                 <TextField
                    fullWidth
                    id="head"
                    label="head"
                    name="head"
                    autoComplete="head"
                    className='apple'
                    error={Boolean(errors.head?.message)}
                    helperText={errors.head?.message}
                    {...register("head")}
                />
                <TextField
                    fullWidth
                    id="number"
                    label="Contact Number"
                    name="number"
                    autoComplete="number"
                    className='apple'
                    error={Boolean(errors.number?.message)}
                    helperText={errors.number?.message}
                    {...register("number")}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    className='apple '
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}
                    {...register("description")}
                />
                <Button type='submit' className='mt-10'>Update</Button>
            </form>
        </div>
    );
};

export default UpdateProfile;
