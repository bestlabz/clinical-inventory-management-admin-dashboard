import React, { useState } from "react";

import { MdBlock } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

import ViewPageFunction from "../../../hooks/ViewDetails/ViewPage1";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { FaFileImage } from "react-icons/fa";
import ModelResponsive from "./ModelResponsive";
import {
  setDoctorView,
  setReceptionistView,
} from "../../../Redux/Slice/Clinic";

const ViewPage1 = ({ setviewPage, headerText, id, category, clinicID }) => {
  const {
    loader,
    clear,
    handleChange,
    setModel,
    loader1,
    model,
    setClear,
    setVerifyCertificate,
    verifyCertificate,
    setVerifyDoctor,
    verifyDoctor,
    TimeSlotsResult,
  } = ViewPageFunction({ category, id, clinicID });
  const dispatch = useDispatch();

  const { details1: details } = useSelector((state) => state.DetailsPage);

  

  const [detailsAction, setDetailsAction] = useState({
    id: "",
    value: "",
  });

  return (
    <div className=" w-full h-full overflow-auto ">
      {loader ? (
        <div className="flex items-center justify-center w-full h-full">
          <ClipLoader size={40} />
        </div>
      ) : (
        <>
          <div className="View-page-top">
            <h1 className="view-page-top-text flex items-center gap-3">
              <IoMdArrowRoundBack
                className="cursor-pointer"
                onClick={() =>
                  category === "doctor"
                    ? dispatch(setDoctorView())
                    : dispatch(setReceptionistView())
                }
              />
              {headerText}
            </h1>
          </div>

          {/* {category === "doctor" && details?.clinics?.verified && (
            <div className="view-page-button-container">
              {details?.clinics?.block ? (
                <button
                  onClick={() => {
                    setDetailsAction({
                      id: id,
                      value: false,
                    });
                    setModel(true);
                  }}
                  className="view-page-button1"
                >
                  UnBlock Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDetailsAction({
                      id: id,
                      value: true,
                    });
                    setModel(true);
                  }}
                  className="view-page-button"
                >
                  Block Account <MdBlock size={20} />
                </button>
              )}
            </div>
          )}

          {category === "receptionist" && details?.verify && (
            <div className="view-page-button-container">
              {details?.block ? (
                <button
                  onClick={() => {
                    setDetailsAction({
                      id: id,
                      value: false,
                    });
                    setModel(true);
                  }}
                  className="view-page-button1"
                >
                  UnBlock Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDetailsAction({
                      id: id,
                      value: true,
                    });
                    setModel(true);
                  }}
                  className="view-page-button"
                >
                  Block Account <MdBlock size={20} />
                </button>
              )}
            </div>
          )} */}

          <h1 className="text-[24px] font-bold mb-2 mt-4">Personal Details</h1>
          <div className="view-page-personal-details-container">
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.name || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Gender<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.gender || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Address<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.address || ""}
                </span>
              </div>
            </div>
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Phone number<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.mobile_number || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Mail ID<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.email || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  DOB<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.dob ? details?.dob : ""}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-[24px] font-bold mb-2">Education Details</h1>

          <div className="view-page-personal-details-container-body1">
            {category === "doctor" ? (
              <>
                {" "}
                <div className="w-full flex items-center gap-2">
                  <span className="view-page-personal-details-container-body-details-key">
                    Under Graduate<span>:</span>
                  </span>
                  <span className="view-page-personal-details-container-body-details-value">
                  {details?.ug_qualification || ""}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="view-page-personal-details-container-body-details-key">
                    Post Graduate<span>:</span>
                  </span>
                  <span className="view-page-personal-details-container-body-details-value">
                  {details?.pg_qualification || ""}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="view-page-personal-details-container-body-details-key">
                    Specialist<span>:</span>
                  </span>
                  <span className="view-page-personal-details-container-body-details-value">
                    {details?.specialist || ""}
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Qualification<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                {details?.qualification || ""}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-[24px] font-bold mb-2">Certificates</h1>

          <div className="view-page-certificate-container mb-6">
            {category === "doctor" ? (
              <>
                <div className="view-page-certificate-container-image">
                  <img
                    onClick={() =>
                      window.open(details?.postgraduate_certificate, "_blank")
                    }
                    src={details?.postgraduate_certificate || ""}
                    className="view-page-certificate-container-image-view"
                  />
                  <div
                    onClick={() =>
                      window.open(details?.postgraduate_certificate, "_blank")
                    }
                    className="view-page-certificate-container-image-name-container"
                  >
                    {details?.postgraduate_certificate?.split(".")?.pop() ===
                    "pdf" ? (
                      <BiSolidFilePdf color="#d8d8d8" size={30} />
                    ) : (
                      <FaFileImage color="#d8d8d8" size={30} />
                    )}
                    <span className="text-[13px] ">
                      {details?.postgraduate_certificate &&
                      details?.postgraduate_certificate?.split("/").pop()
                        .length > 10
                        ? details?.postgraduate_certificate
                            .split("/")
                            .pop()
                            .substring(0, 15) +
                          "." +
                          details?.postgraduate_certificate?.split(".")?.pop()
                        : details?.postgraduate_certificate?.split("/").pop()}
                    </span>
                  </div>
                </div>
                <div className="view-page-certificate-container-image">
                  <img
                    onClick={() =>
                      window.open(details?.undergraduate_certificate, "_blank")
                    }
                    src={details?.undergraduate_certificate || ""}
                    className="view-page-certificate-container-image-view"
                  />
                  <div
                    onClick={() =>
                      window.open(details?.undergraduate_certificate, "_blank")
                    }
                    className="view-page-certificate-container-image-name-container"
                  >
                    {details?.undergraduate_certificate?.split(".")?.pop() ===
                    "pdf" ? (
                      <BiSolidFilePdf color="#d8d8d8" size={30} />
                    ) : (
                      <FaFileImage color="#d8d8d8" size={30} />
                    )}
                    <p className="view-page-certificate-container-image-name">
                      <span className="text-[13px] ">
                        {details?.undergraduate_certificate &&
                        details?.undergraduate_certificate?.split("/").pop()
                          .length > 10
                          ? details?.undergraduate_certificate
                              ?.split("/")
                              .pop()
                              .substring(0, 15) +
                            "." +
                            details?.undergraduate_certificate
                              ?.split(".")
                              ?.pop()
                          : details?.undergraduate_certificate
                              ?.split("/")
                              .pop()}
                      </span>
                      {/* <span className="text-[12px] text-gray-400 ">200KB</span> */}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="view-page-certificate-container-image">
                  {details?.certificate?.split(".")?.pop() === "pdf" ? (
                    <div
                      onClick={() =>
                        window.open(details?.certificate, "_blank")
                      }
                      className="view-page-certificate-container-image-view flex items-center justify-center"
                    >
                      <BiSolidFilePdf color="#FF2D00" size={60} />
                    </div>
                  ) : (
                    <img
                      onClick={() =>
                        window.open(details?.certificate, "_blank")
                      }
                      src={details?.certificate || ""}
                      className="view-page-certificate-container-image-view"
                    />
                  )}
                  <div
                    onClick={() => window.open(details?.certificate, "_blank")}
                    className="view-page-certificate-container-image-name-container"
                  >
                    {details?.certificate?.split(".")?.pop() === "pdf" ? (
                      <BiSolidFilePdf color="#d8d8d8" size={40} />
                    ) : (
                      <FaFileImage color="#d8d8d8" size={40} />
                    )}
                    <p className="view-page-certificate-container-image-name">
                      <span className="text-[13px] ">
                        {details?.certificate &&
                        details?.certificate?.split("/").pop().length > 10
                          ? details?.certificate
                              ?.split("/")
                              .pop()
                              .substring(0, 15) +
                            "." +
                            details?.certificate?.split(".")?.pop()
                          : details?.certificate?.split("/").pop()}
                      </span>
                      {/* <span className="text-[12px] text-gray-400 ">200KB</span> */}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

       
        </>
      )}

      <ModelResponsive
        modalpopup={model}
        openModal={setModel}
        trigger={handleChange}
        details={detailsAction}
        clear={clear}
        setClear={setClear}
        loader={loader1}
      />
    </div>
  );
};

export default ViewPage1;
