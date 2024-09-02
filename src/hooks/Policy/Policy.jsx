import React, { useEffect, useState } from "react";

import ApiRequest from "../../services/httpService";
import toast from "react-hot-toast";

const Policy = () => {
  const [open, setopen] = useState(null);
  const [editable, setEditable] = useState(null);
  const [loader, setLoader] = useState(false);
  const [privacy, setPrivacy] = useState("");
  const [acceptance, setAcceptance] = useState("");
  const [about, setAbout] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const API = async () => {
      if (!refetch) {
        try {
          const { success, privacy_policy } = await ApiRequest.get(
            "/getprivacypolicy"
          );

          if (success) {
            setPrivacy(privacy_policy?.[0]?.content);
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }

        try {
          const { success, terms_and_conditionss } = await ApiRequest.get(
            "/getterms_and_conditions"
          );

          if (success) {
            setAcceptance(terms_and_conditionss?.[0]?.content);
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }

        try {
          const { success, about_uss } = await ApiRequest.get("/getabout_us");

          if (success) {
            setAbout(about_uss?.[0]?.content);
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    };

    API();
  }, [refetch]);

  const handleSubmit = async () => {
    const getApiDetails = () => {
      switch (open) {
        case 1:
          return { url: "/addprivacypolicy", content: privacy };
        case 2:
          return { url: "/addterms_and_condition", content: acceptance };
        case 3:
          return { url: "/addabout_us", content: about };
        default:
          return null;
      }
    };

    const apiDetails = getApiDetails();

    if (!apiDetails) return; // Exit if 'open' does not match any case

    try {
      setLoader(true);
      setRefetch(true);
      const { success, message } = await ApiRequest.post(apiDetails.url, {
        content: apiDetails.content,
      });

      if (success) {
        setopen(null)
        setEditable(null)
        setRefetch(false);
        setLoader(false);
        toast.success(message);
      }
    } catch (error) {
      setRefetch(false);
      setLoader(false);
      toast.error(
        error.response?.data?.error || "An unexpected error occurred"
      );
    }
  };

  return {
    open,
    setopen,
    editable,
    setEditable,
    loader,
    setLoader,
    privacy,
    setPrivacy,
    acceptance,
    setAcceptance,
    about,
    setAbout,
    handleSubmit,
  };
};

export default Policy;
