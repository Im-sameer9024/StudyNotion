import toast from "react-hot-toast";

import { authEndPoints } from "../api";

import {setLoading} from '../../redux/app/slices/authSlice'
import { apiConnector } from "../apiConnector";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = authEndPoints;


export const sendOtp = async (email,navigate) => {

    return async(dispatch) =>{
        const toastId = toast.loading("Sending OTP...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST',SENDOTP_API,{email});

            console.log("response of api in sendOtp ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP sent successfully")
            navigate('verify-email')
            
        } catch (error) {
            console.log("error in sendOtp api",error)
            toast.error("Something went wrong")  
        }finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
    
}
