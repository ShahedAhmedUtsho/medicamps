import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from '../FireBase/Firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [modelHead, setModelHead] = useState("");
    const [modelMessage, setModelMessage] = useState("");
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    // Preserve auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
            setUser(currentUser);
            console.log('Current user:', currentUser); // Log the current user
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Sign out
    const logOut = () => {
        signOut(Auth)
            .then(() => {
                // setModelHead("logout");
                // setModelMessage("Successfully logged out");
                // openSuccessModal();
const userUID = user?.uid
                axios.post('https://medicamp-server-tau.vercel.app/logout',userUID,{withCredentials:true})
                .then(() => {
                  // console.log(res.data)
                  // console.log(userUID)
                })
                


            })
            .catch((err) => console.log(err));
    };

    const openSuccessModal = () => {
        setIsSuccessOpen(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessOpen(false);
    };

    const openErrorModal = () => {
        setIsErrorOpen(true);
    };

    const closeErrorModal = () => {
        setIsErrorOpen(false);
    };

    const shareData = {
        user,
        setUser,
        loading,
        setLoading,
        modelHead,
        modelMessage,
        setModelHead,
        setModelMessage,
        setIsSuccessOpen,
        isSuccessOpen,
        openSuccessModal,
        closeSuccessModal,
        closeErrorModal,
        openErrorModal,
        isErrorOpen,
        logOut,
    };

    return (
        <AuthContext.Provider value={shareData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
