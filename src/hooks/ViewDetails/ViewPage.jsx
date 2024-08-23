import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setDetails, setDetails1 } from "../../Redux/Slice/DetailsPage";
import toast from "react-hot-toast";

import ApiRequest from "../../services/httpService";
import {
  addDoctorCurrentPage,
  addDoctorLimit,
  addDoctorList,
  addDoctorTotalPage,
  addReceptionistCurrentPage,
  addReceptionistLimit,
  addReceptionistList,
  addReceptionistTotalPage,
} from "../../Redux/Slice/StaffList";

const ViewPage = ({ id }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [verifyCertificate, setverifyCertificate] = useState(false);
  const [verifyClinic, setverifyClinic] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [model, setModel] = useState(false);
  const [clear, setClear] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    dispatch(setDetails1(null));
  }, []);

  useEffect(() => {
    const API = async () => {
      if (id && !model && !verifyClinic && !verifyCertificate) {
        try {
          setLoader(true);
          const { success, clinic } = await ApiRequest.get(`/clinic/${id}`);
          if (success) {
            setLoader(false);
            dispatch(setDetails(clinic));
          }
        } catch (error) {
          setLoader(false);
          toast.error(error.response.data.error);
        }
      }
    };

    API();
  }, [verifyCertificate, verifyClinic, model]);

  useEffect(() => {
    const API = async () => {
      if (id) {
        try {
          const {
            success,
            doctorAvailability,
            limit,
            totalPages,
            currentPage,
          } = await ApiRequest.get(`/admin/doctersby_clinic/${id}`);
          if (success) {
            dispatch(addDoctorList(doctorAvailability));
            dispatch(addDoctorCurrentPage(currentPage));
            dispatch(addDoctorTotalPage(totalPages));
            dispatch(addDoctorLimit(limit));
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    };

    API();
  }, [id]);

  useEffect(() => {
    const API = async () => {
      if (id) {
        try {
          const { success, receptionists, limit, totalPages, currentPage } =
            await ApiRequest.get(`/admin/receptionist/clinic/${id}`);

          if (success) {
            dispatch(addReceptionistList(receptionists));
            dispatch(addReceptionistCurrentPage(currentPage));
            dispatch(addReceptionistTotalPage(totalPages));
            dispatch(addReceptionistLimit(limit));
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    };

    API();
  }, [id]);

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
      toast.error(error.response.data.error);
      return;
    }
  };

  const handleVerifyClinic = async () => {
    try {
      setverifyClinic(true);
      const { success, message } = await ApiRequest.put(`/verify-admin/${id}`);
      if (success) {
        setverifyClinic(false);
        toast.success(message);
        return;
      }
    } catch (error) {
      setverifyClinic(false);
      toast.error(error.response.data.error);
      return;
    }
  };

  const handleChange = async (id, value, reason) => {
    try {
      setLoader1(true);
      const { success, message } = await ApiRequest.post(`/clinic/${id}`, {
        block: value,
        reason,
      });

      if (success) {
        toast.success(message);
        setLoader1(false);
        setClear(true);
        return;
      }
    } catch (error) {
      setLoader1(false);
      toast.error(error.response.data.error);
    }
  };

  return {
    loader,
    verifyCertificate,
    handleVerifyCertificate,
    verifyClinic,
    handleVerifyClinic,
    handleChange,
    model,
    setModel,
    clear,
    setClear,
    loader1,
    step,
    setStep,
  };
};

export default ViewPage;
