import React, { useEffect, useState } from "react";

// Third party libraries
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Components
import FormHandel from "../../Components/Properites/FormHandel/Formhandel";

//Utilities
import { LoginSchema } from "../../utils/Validation/Login";

//Hooks
import { setUser } from "../../Redux/Slice/User";
import { setOTP } from "../../Redux/Slice/Otp";
import toast from "react-hot-toast";

import ApiRequest from '../../services/httpService'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [otpCount, setotpCount] = useState(6);
  const [otp, setOtp] = useState(new Array(otpCount).fill(""));
  const [error, setError] = useState(false);
  const [number, setNumber] = useState(null);
  const [loader, setloader] = useState(false)

  const { otpValue } = useSelector((state) => state.otpValue);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, [error]);

  const onSubmit = async (values, actions) => {
    if(step === 1) {
      try {
        setloader(true)
        const {success} = await ApiRequest.post('/send_otp', {phone : values.phone_number})

        if(success) {
          setloader(false)
          setNumber(values.phone_number)
          return setStep((step) => step + 1);
        }
        
      } catch (error) {
        setloader(false)
        toast.error(error.response.data.message)
        
      }
    }
  };

  const { errors, handleChange, handleSubmit, values } = FormHandel({
    initialValue: { phone_number: "" },
    schema: LoginSchema,
    submitFunction: onSubmit,
  });

  const handelClickOTP = async () => {
    if (!otpValue) {
      return setError(true);
    }
    if (otpValue?.length < 6) {
      return setError(true);
    } else {
      try {
        setloader(true)
        const {success, admin, token} = await ApiRequest.post('/verify_otp', {phone: number, otp: otpValue})
        if(success) {
          setloader(false)
          setError(false);
          dispatch(setUser(admin));
          localStorage.setItem("token", token)
          return navigate("/dashboard");
        }
        
      } catch (error) {
        setloader(false)
        toast.error(error.response.data.error)
        
      }
      
    }
  };

  const handelChange = ({ e }) => {
    const value = e;

    // Check if the value is a digit
    if (!/^\d*$/.test(value)) {
      return; // If not a digit, return without updating the state
    }

    dispatch(setOTP(value));
    return;
  };


  return {
    step,
    setStep,
    setotpCount,
    handelChange,
    otp,
    handelClickOTP,
    error,
    errors,
    handleChange,
    handleSubmit,
    values,
    otpValue,
    loader
  };
};

export default Login;
