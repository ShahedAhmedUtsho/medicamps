
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from '../FireBase/Firebase.config';





export const AuthContext = createContext()
const AuthProvider = ({children}) => {
   
const [user,setUser] =useState(null) ;
const [loading,setLoading] = useState(false)
const [modelHead, setModelHead] = useState("");
const [modelMessage, setModelMessage] = useState("");
const [isSuccessOpen, setIsSuccessOpen] = useState(false);


// priserv auth 



useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, currentUser => {
      
        setUser(currentUser);
      console.log(user)
        setLoading(false);
        
      
    });

    return () => {
        unsubscribe();
    };
}, []);



// sign out 

const logOut = () => {
    signOut(Auth)
        .then(() => {


            setModelHead("logout")
            setModelMessage("successfully logout")
           openSuccessModal()
        //     axios.post('https://test-tau-green-45.vercel.app/logout',userUID,{withCredentials:true})
        //   .then(() => {
        //     // console.log(res.data)
        //     // console.log(userUID)
        //   })
        })
        .catch(err => console.log(err));
};







const openSuccessModal = () => {
    setIsSuccessOpen(true);
};
const closeSuccessModal = () => {
    setIsSuccessOpen(false);
};


const [isErrorOpen, setIsErrorOpen] = useState(false);
const openErrorModal = () => {
    setIsErrorOpen(true);
};
const closeErrorModal = () => {
    setIsErrorOpen(false);
};

















const shareData = {
    user,setUser,
    loading,setLoading,
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
    logOut

}

    return (
        <AuthContext.Provider value={shareData}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children:PropTypes.node
}
export default AuthProvider;