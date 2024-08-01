import React, { useEffect, useState } from "react";

import ApiRequest from "../../services/httpService";
import { useDispatch, useSelector } from "react-redux";
import { setClinic } from "../../Redux/Slice/Clinic";
import {
  setCurrentPage,
  setNextPage,
  setPrePage,
  setTotalCount,
} from "../../Redux/Slice/pagination";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [selectedDate, setselectedDate] = useState();
  const [viewPage, setviewPage] = useState(false);
  const [clinicId, setclinicId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [model, setModel] = useState(false);
  const [model1, setModel1] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState({ label: 10, value: 10 });
  const [loader, setLoader] = useState(false);
  const [clear, setClear] = useState(false);
  const [statusAvailable, setStatusAvailable] = useState(false)

  const { clinics } = useSelector((state) => state.Clinic);

  const { currentPage: currentPages, totalCount: paginationCount } =
    useSelector((state) => state.pagination);

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);

    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.pathname);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!model && !model1) {
        try {
          const endPoint = selectedFilter
            ? `page=${currentPages}&adminVerified=${
                selectedFilter.label === "Verified" ? "true" : "false"
              }&limit=${selectedLimit.value}`
            : `page=${currentPages}&limit=${selectedLimit.value}`;
          const { success, clinics, currentPage, totalPages } =
            await ApiRequest.get(`/clinics?${endPoint}`);
          if (success) {
            setStatusAvailable(false)
            dispatch(
              setCurrentPage(
                clinics.length === 0 && currentPage !== 1
                  ? currentPage - 1
                  : currentPage
              )
            );
            dispatch(setTotalCount(totalPages));
            dispatch(setClinic(clinics));

            return;
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.error);
        }
      }
    };
    fetchData();
  }, [currentPages, selectedFilter, model, model1, selectedLimit]);

  const style = {
    width: "100%",
    padding: "0px",
    border: "1px solid #d3d3d3",
    outline: "1px solid #d3d3d3",
    background: "rgba(218, 227, 255, 0.31)",
  };

  const Options = [
    { label: "Verified", value: "adminVerified" },
    { label: "Pending", value: "adminVerified" },
  ];

  const getPagesCut = ({ pagesCutCount = 2 }) => {
    const ceiling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);

    if (paginationCount <= pagesCutCount) {
      return { start: 1, end: Number(paginationCount) };
    } else if (Number(currentPages) <= ceiling) {
      return { start: 1, end: pagesCutCount };
    } else if (Number(currentPages) + floor >= Number(paginationCount)) {
      return {
        start: Number(paginationCount) - Number(pagesCutCount) + 1,
        end: Number(paginationCount),
      };
    } else {
      return {
        start: Number(currentPages) - ceiling + 1,
        end: Number(currentPages) + floor,
      };
    }
  };

  const { start, end } = getPagesCut({ pagesCutCount: 3 }); // Adjust pagesCutCount as needed
  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const next = () => {
    if (currentPages !== pageNumbers[pageNumbers.length - 1]) {
    setStatusAvailable(true)

      return dispatch(setNextPage());
    }
  };

  const pre = () => {
    if (currentPages !== 1) {
      setStatusAvailable(true)
      return dispatch(setPrePage());
    }
  };

  const handleChange = async (id, value, reason) => {
    try {
      setLoader(true);
      const { success, message } = await ApiRequest.post(`/clinic/${id}`, {
        block: value,
        reason: reason,
      });
      if (success) {
        setLoader(false);
        setClear(true);
        return toast.success(message);
      }
    } catch (error) {
      setLoader(false);
      console.log("ee", error);
    }
  };

  const handleChangeSubscription = async (id, value, reason) => {
    try {
      setLoader(true);
      const { success, message } = await ApiRequest.put(
        `/verify_subscription/${id}`,
        {
          subscription: value,
        }
      );
      if (success) {
        setLoader(false);
        setClear(true);
        setModel1(false);
        return toast.success(message);
      }
    } catch (error) {
      setLoader(false);
      console.log("ee", error);
    }
  };

  return {
    setselectedDate,
    selectedDate,
    style,
    Options,
    paginationCount,
    currentPages,
    pageNumbers,
    next,
    pre,
    tablebody: clinics,
    setviewPage,
    viewPage,
    clinicId,
    setclinicId,
    setSelectedFilter,
    selectedFilter,
    model,
    setModel,
    handleChange,
    loader,
    clear,
    setClear,
    model1,
    setModel1,
    handleChangeSubscription,
    selectedLimit,
    setSelectedLimit,
    statusAvailable
  };
};

export default Dashboard;
