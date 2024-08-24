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
import { addBalanceDue } from "../../Redux/Slice/Clinic";

const ViewPage = ({ id }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [verifyCertificate, setverifyCertificate] = useState(false);
  const [verifyClinic, setverifyClinic] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [model, setModel] = useState(false);
  const [clear, setClear] = useState(false);
  const [step, setStep] = useState(1);
  const [balanceDuePopup, setBalanceDuePopup] = useState(false);
  const [reFetchDoctor, setReFetchDoctor] = useState(false);
  const [reFetchReceptionist, setReFetchReceptionist] = useState(false);
  const [subscriptionID, setSubscriptionID] = useState(null);
  const [balanceDueShow, setBalanceDueShow] = useState(false);

  useEffect(() => {
    dispatch(setDetails1(null));
  }, []);

  useEffect(() => {
    const API = async () => {
      if(!reFetchDoctor && !reFetchReceptionist) {
        try {
          const { success, clinic, balancedue } = await ApiRequest.get(
            `/clinic/${id}`
          );
  
          if (success) {
            const subscriptionDetails =
              clinic?.subscription_details[
                clinic?.subscription_details?.length - 1
              ];
            setBalanceDueShow(balancedue);
            setSubscriptionID(subscriptionDetails?.subscription_id?._id);
          }
        } catch (error) {
          console.log("ee", error);
        }

      }
    };

    API();
  }, [id, reFetchDoctor, reFetchReceptionist]);

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
      if (id && !reFetchDoctor) {
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
  }, [id, reFetchDoctor]);

  useEffect(() => {
    const API = async () => {
      if (id && !reFetchReceptionist) {
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
  }, [id, reFetchReceptionist]);

  useEffect(() => {
    const API = async () => {
      if (balanceDuePopup) {
        if (subscriptionID) {
          try {
            const {
              success,
              doctors,
              receptionists,
              totalUnsubscriptionAmount,
              subscriptionDurations,
            } = await ApiRequest.post(`/balancedue/${id}/${subscriptionID}`);

            if (success) {
              const data = {
                doctors,
                receptionists,
                totalUnsubscriptionAmount,
                subscriptionDurations,
              };

              dispatch(addBalanceDue(data));
              return;
            }
          } catch (error) {
            toast.error(error.response.data.error);
          }
        } else {
          toast.error("No balance due popup or subscription ID");
        }
      }
    };

    API();
  }, [balanceDuePopup]);

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

  const handleBalanceModel = () => {
    setBalanceDuePopup(!balanceDuePopup);
  };

  const handleChangeStatusDoctor = async ({ doctor_id, status, clinic_id }) => {
    try {
      setReFetchDoctor(true);
      const { success, message } = await ApiRequest.put(
        `/verify_subscription/doctor/${doctor_id}`,
        {
          subscription: status,
          clinicId: clinic_id,
        }
      );

      if (success) {
        toast.success(message);
        return setReFetchDoctor(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  const handleChangeStatusReceptionist = async ({
    receptionist_id,
    status,
  }) => {
    try {
      setReFetchReceptionist(true);
      const { success, message } = await ApiRequest.put(
        `/verify_subscription/receptionist/${receptionist_id}`,
        {
          subscription: status,
        }
      );
      if (success) {
        toast.success(message);
        return setReFetchReceptionist(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.response.data.error);
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
    balanceDuePopup,
    handleBalanceModel,
    handleChangeStatusDoctor,
    handleChangeStatusReceptionist,
    balanceDueShow,
  };
};

export default ViewPage;
