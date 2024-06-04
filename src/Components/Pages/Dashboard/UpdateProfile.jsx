import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Button } from 'keep-react';
import defaultCover from '../../../Assets/svg/profileCover.svg';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:3000/mediusers/${user?.uid}`;

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
            const response = await fetch(url);
            return response.json();
        },
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            photoURL: "",
            cover: "",
            email: "",
            number: "",
            description: ""
        }
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile?.name || user?.displayName,
                photoURL: profile?.photoURL || user?.photoURL,
                cover: profile?.cover || defaultCover,
                email: profile?.email || user?.email,
                number: profile?.number || "",
                description: profile?.description || ""
            });
        }
    }, [profile, reset, user]);

    const handleUpdate = (data) => {
        console.log("hitting");
        alert(JSON.stringify(data));
    }

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
                    className='apple !h-40'
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}
                    {...register("description")}
                />
                <Button type='submit' className='mt-20'>Update</Button>
            </form>
        </div>
    );
};

export default UpdateProfile;
