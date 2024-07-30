import React, { useEffect, useState } from "react";

import ApiRequest from "../../services/httpService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSubscription,
  AddSubscriptionCard,
} from "../../Redux/Slice/Subscription";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [features, setFeatures] = useState([]);
  const [featurevalue, setFeaturevalue] = useState("");
  const [addFeatureError, setaddFeatureError] = useState(false);
  const [step, setStep] = useState(1);
  const [id, setId] = useState(null);
  const [reFetch, setreFetch] = useState(false);
  const [model, setmodel] = useState(false);

  const { subscriptionNames } = useSelector((state) => state.subscription);

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
    { label: "Year", value: "year" },
    { label: "Day", value: "day" },

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
        }
      }
    };
    API();
  }, [planNameloader]);

  useEffect(() => {
    const API = async () => {
      if (!reFetch) {
        try {
          const { success, durations } = await ApiRequest.get(
            "/subscription_durations"
          );

          if (success) {
            const datas = durations.map((items) => {
              return {
                cardID: items?._id,
                title: items?.title?.title,
                titleID: items?.title?._id,
                price: items?.pricePerMonth,
                discount: items?.discount,
                duration: items?.duration,
                durationInNo: items?.durationInNo,
                feature: items?.feature,
              };
            });

            dispatch(AddSubscriptionCard(datas));
            return;
          }
        } catch (error) {
          console.log("e", error);
        }
      }
    };

    API();
  }, [reFetch]);

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
        feature: features,
      };

      try {
        setsubmitLoader(true);
        setreFetch(true);
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
          setFeatures([]);
          setStep(1);
          setreFetch(false);
          return toast.success(message);
        }
      } catch (error) {
        setsubmitLoader(false);
        setreFetch(false);
        console.log("ee", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (id) {
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
          feature: features,
        };

        try {
          setsubmitLoader(true);
          setreFetch(true);
          const { success, message } = await ApiRequest.put(
            `/subscription_durations/${id}`,
            bodyData
          );

          if (success) {
            setsubmitLoader(false);
            setSelectPlanName(null);
            setselectedDuration(null);
            setSelectedDurationNumber(null);
            setPricevalue("");
            setDiscountValue("");
            setFeatures([]);
            setStep(1);
            setreFetch(false);
            return toast.success(message);
          }
        } catch (error) {
          setsubmitLoader(false);
          setreFetch(false);
          console.log("ee", error);
        }
      }
    } else {
      toast.error("ID is not available");
      return;
    }
  };

  const handleEdit = async (id) => {
    try {
      const { success, duration } = await ApiRequest.get(
        `/subscription_durations/${id}`
      );

      if (success) {
        setStep(3);
        const filter = subscriptionNames.filter(
          (s) => s.value === duration.title
        )[0];
        setId(duration._id);
        setSelectPlanName(filter);
        setselectedDuration(
          duration.duration === "month"
            ? { label: "Month", value: "month" }
            : { label: "Year", value: "year" }
        );
        setSelectedDurationNumber({
          label: duration.durationInNo,
          value: duration.durationInNo,
        });
        setPricevalue(duration.pricePerMonth);
        setDiscountValue(duration.discount);
        setFeatures(duration.feature);
      }
    } catch (error) {
      console.log("ee", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setreFetch(true);
      setsubmitLoader(true)
      const { success, message } = await ApiRequest.delete(`/subscription_durations/${id}`);

      if (success) {
        setmodel(false);
        setreFetch(false);
        setsubmitLoader(false)
        toast.success(message);
        return;
      }
    } catch (error) {
        setsubmitLoader(false)
        setreFetch(false);

      console.log("ee", error);
    }
  };

  // const goBack = () => {
  //   navigate(-1); // -1 means go back one page
  // };

  const AddFeature = (value) => {
    if (value !== "") {
      setFeatures((prev) => [...prev, value]);
      setFeaturevalue("");
    } else {
      setaddFeatureError(true);
    }
  };

  const RemoveFeature = (index) => {
    const filter = features.filter((_, idx) => idx !== index);
    setFeatures(filter);
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
    AddFeature,
    setFeaturevalue,
    featurevalue,
    RemoveFeature,
    addFeatureError,
    setaddFeatureError,
    features,
    handleEdit,
    handleUpdate,
    model,
    setmodel,
    handleDelete,
  };
};

export default Subscription;
