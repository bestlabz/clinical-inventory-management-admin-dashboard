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

const Dashboard = () => {
  const dispatch = useDispatch();

  const [selectedDate, setselectedDate] = useState();
  const [viewPage, setviewPage] = useState(false);
  const [clinicId, setclinicId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const { clinics } = useSelector((state) => state.Clinic);

  const { currentPage: currentPages, totalCount: paginationCount } =
    useSelector((state) => state.pagination);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endPoint = selectedFilter
          ? `page=${currentPages}&${selectedFilter.value}=true`
          : `page=${currentPages}`;
        const { success, clinics, currentPage, totalPages } =
          await ApiRequest.get(`/clinics?${endPoint}`);
        if (success) {
          dispatch(setCurrentPage(currentPage));
          dispatch(setTotalCount(totalPages));
          dispatch(setClinic(clinics));

          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPages, selectedFilter]);

  const style = {
    width: "100%",
    padding: "0px",
    border: "1px solid #d3d3d3",
    outline: "1px solid #d3d3d3",
    background: "rgba(218, 227, 255, 0.31)",
  };

  const Options = [{ label: "Verified", value: "adminVerified" }];

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
      return dispatch(setNextPage());
    }
  };

  const pre = () => {
    return dispatch(setPrePage());
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
  };
};

export default Dashboard;
