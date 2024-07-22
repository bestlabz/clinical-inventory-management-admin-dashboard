import React, { useEffect, useState } from "react";

import ApiRequest from "../../services/httpService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AddSubscription } from "../../Redux/Slice/Subscription";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [planNameloader, setPlanNameLoader] = useState(false);
  const [planName, setplanName] = useState("");
  const [fetchLoader, setFetchLoader] = useState(false);
  const [selectPlanName, setSelectPlanName] = useState(null);
  const [selectedDuration, setselectedDuration] = useState(null);
  const [selectedDurationNumber, setSelectedDurationNumber] = useState(null);
  const [pricevalue, setPricevalue] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [validationError, setvalidationError] = useState(false);
  const [submitLoader, setsubmitLoader] = useState(false);
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (validationError) {
      setTimeout(() => {
        setvalidationError(false);
      }, 2000);
    }
  }, [validationError]);

  const style = {
    width: "100%",
    padding: "0px",
    border: "1px solid #d3d3d3",
    outline: "1px solid #d3d3d3",
    background: "rgba(218, 227, 255, 0.31)",
  };

  const Options = [
    { label: "Month", value: "month" },
    { label: "year", value: "year" },
  ];

  const DurationNumber = [
    { label: "1", value: "1" },
    { label: "3", value: "3" },
    { label: "6", value: "6" },
    { label: "12", value: "12" },
  ];

  useEffect(() => {
    const API = async () => {
      if (!planNameloader) {
        try {
          setFetchLoader(true);
          const { success, Titles } = await ApiRequest.get(
            "/subscription_Title"
          );

          if (success) {
            setFetchLoader(false);
            const datas = Titles.map((item) => {
              return {
                label: item.title,
                value: item._id,
              };
            });
            dispatch(AddSubscription(datas));
            return;
          }
        } catch (error) {
          setFetchLoader(false);
          console.log("ee", error);
        }
      }
    };
    API();
  }, [planNameloader]);

  const CreatePlanName = async () => {
    if (planName !== "") {
      try {
        setPlanNameLoader(true);
        const { success, message } = await ApiRequest.post(
          "/subscription_Title",
          {
            title: planName,
          }
        );

        if (success) {
          setPlanNameLoader(false);
          setplanName("");
          return toast.success(message);
        }
      } catch (error) {
        setPlanNameLoader(false);
        console.log("ee", error);
      }
    }
  };

  const handleCreate = async () => {
    if (
      !selectPlanName ||
      !selectedDuration ||
      !selectedDurationNumber ||
      pricevalue === "" ||
      discountValue === ""
    ) {
      return setvalidationError(true);
    } else {
      const bodyData = {
        duration: selectedDuration.value,
        pricePerMonth: pricevalue,
        discount: discountValue,
        durationInNo: selectedDurationNumber.value,
        title: selectPlanName.value,
      };

      try {
        setsubmitLoader(true);
        const { success, message } = await ApiRequest.post(
          "/subscription_durations",
          bodyData
        );

        if (success) {
          setsubmitLoader(false);
          setSelectPlanName(null);
          setselectedDuration(null);
          setSelectedDurationNumber(null);
          setPricevalue("");
          setDiscountValue("");
          return toast.success(message);
        }
      } catch (error) {
        setsubmitLoader(false);
        console.log("ee", error);
      }
    }
  };


  const goBack = () => {
    navigate(-1); // -1 means go back one page
  };


  return {
    CreatePlanName,
    setplanName,
    planNameloader,
    planName,
    fetchLoader,
    style,
    selectPlanName,
    setSelectPlanName,
    Options,
    selectedDuration,
    setselectedDuration,
    DurationNumber,
    selectedDurationNumber,
    setSelectedDurationNumber,
    pricevalue,
    setPricevalue,
    discountValue,
    setDiscountValue,
    validationError,
    handleCreate,
    submitLoader,
    setStep,
    step,
    goBack
  };
};

export default Subscription;
