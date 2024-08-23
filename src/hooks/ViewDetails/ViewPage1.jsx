import React, { useEffect, useState } from "react";

import ApiRequest from "../../services/httpService";
import { useDispatch, useSelector } from "react-redux";
import { setDetails1 } from "../../Redux/Slice/DetailsPage";
import toast from "react-hot-toast";

// import ApiRequest from '../../services/httpService'

const ViewPage1 = ({ category, id, clinicID }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [model, setModel] = useState(false);
  const [clear, setClear] = useState(false);
  const [loader1, setLoader1] = useState(false);

  const [verifyCertificate, setVerifyCertificate] = useState(false);
  const [verifyDoctor, setVerifyDoctor] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);


  useEffect(() => {
    const API = async () => {
      if (category === "doctor" && id) {
        try {
          setLoader(true);
          const { success, doctors } = await ApiRequest.get(`/admin/doctors/${id}`);

          if (success) {
            setLoader(false);
         
            const doctorDatas = {
              ...doctors,
              clinics: doctors?.clinics?.filter(
                (item) => item?.clinicId?._id === clinicID
              )[0],
            };

            dispatch(setDetails1(doctorDatas));

            return;
          }
        } catch (error) {
          setLoader(false);
          toast.error(
            `${error.response?.data?.message || error.response.data.error}`
          );
        }
      }

      if (category === "receptionist" && id) {
        try {
          setLoader(true);
          const { success, receptionist } = await ApiRequest.get(
            `/admin/receptionists/${id}`
          );

          if (success) {
            setLoader(false);
            return dispatch(setDetails1(receptionist));
          }
        } catch (error) {
          setLoader(false);
          toast.error(error.response.data.error);
        }
      }
    };

    API();
  }, [category, model, id]);


  const handleChange = async (id, value, reason) => {
    if (category === "doctor") {
      try {
        setLoader1(true);
        const { success } = await ApiRequest.post(`/doctor/${id}`, {
          clinicId: clinicID,
          block: value,
          reason,
        });

        if (success) {
          setLoader1(false);
          setClear(true);
          toast.success("Doctor status updated successfully");
        }
      } catch (error) {
        setLoader1(false);
        toast.error(
          `${error.response?.data?.message || error.response.data.error}`
        );
      }
    }
    if (category === "receptionist") {
      try {
        setLoader1(true);
        const { success } = await ApiRequest.post(`/receptionist/${id}`, {
          block: value,
          reason,
        });

        if (success) {
          setLoader1(false);
          toast.success("Receptionist status updated successfully");
          return setClear(true);
        }
      } catch (error) {
        setLoader1(false);
        toast.error(
          `${error.response?.data?.message || error.response.data.error}`
        );
      }
    }
  };

  const style = {
    width: "70%",
    padding: "3px 0 ",
    border: "1px solid #d3d3d3",
    outline: "1px solid #d3d3d3",
    background: "rgba(218, 227, 255, 0.31)",
  };

  const Options = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  return {
    loader,
    model,
    setModel,
    clear,
    handleChange,
    loader1,
    setClear,
    setVerifyCertificate,
    verifyCertificate,
    setVerifyDoctor,
    verifyDoctor,
    style,
    Options,
    TimeSlotsResult: timeSlots,
  };
};

export default ViewPage1;
