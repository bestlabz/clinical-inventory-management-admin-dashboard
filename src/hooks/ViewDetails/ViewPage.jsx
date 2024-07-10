import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setDetails } from "../../Redux/Slice/DetailsPage";
import toast from "react-hot-toast";

import ApiRequest from "../../services/httpService";

const ViewPage = ({ id }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [verifyCertificate, setverifyCertificate] = useState(false);
  const [verifyClinic, setverifyClinic] = useState(false);

  useEffect(() => {
    const API = async () => {
      if (id) {
        try {
          setLoader(true);
          const { success, clinic } = await ApiRequest.get(`/clinic/${id}`);

          if (success) {
            setLoader(false);
            dispatch(setDetails(clinic));
          }
        } catch (error) {
          setLoader(false);
          console.log("ee", error);
        }
      }
    };

    API();
  }, [verifyCertificate, verifyClinic]);

  const handleVerifyCertificate = async () => {
    try {
      setverifyCertificate(true);
      const { success, message } = await ApiRequest.put(
        `/verify_clinic/${id}`,
        {
          certificateVerified: true,
        }
      );
      if (success) {
        setverifyCertificate(false);
        toast.success(message);
        return;
      }
    } catch (error) {
      setverifyCertificate(false);
      toast.error(error.response.data.message);
      return;
    }
  };

  const handleVerifyClinic = async () => {
    try {
      setverifyClinic(true);
      const { success, message } = await ApiRequest.get(`/verify-admin/${id}`);
      if (success) {
        setverifyClinic(false);
        toast.success(message);
        return;
      }
    } catch (error) {
      setverifyClinic(false);
      toast.error(error.response.data.message);
      return;
    }
  };

  return {
    loader,
    verifyCertificate,
    handleVerifyCertificate,
    verifyClinic,
    handleVerifyClinic,
  };
};

export default ViewPage;
