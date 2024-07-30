import React, { useState } from "react";

//third party
import { BiSolidFilePdf } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { FaFileImage } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

//Components
import ModelResponsive from "./ModelResponsive";

//Hooks
import ViewPageFunction from "../../../hooks/ViewDetails/ViewPage";
import dayjs from "dayjs";

const ViewPage = ({ setviewPage, headerText, id }) => {
  const {
    loader,
    handleVerifyCertificate,
    handleVerifyClinic,
    verifyCertificate,
    verifyClinic,
    clear,
    handleChange,
    loader1,
    model,
    setClear,
    setModel,
  } = ViewPageFunction({ id });

  const { details } = useSelector((state) => state.DetailsPage);

  const [detailsAction, setDetailsAction] = useState({
    id: "",
    value: "",
  });

  const dateString = details?.subscription_enddate
  const [day, month, year] = dateString.split('-');
  const date = new Date(year, month - 1, day);


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
                onClick={() => setviewPage(false)}
              />
              {headerText}
            </h1>
          </div>

          <div className="view-page-button-container">
            <div className=" flex items-start gap-1">
              <p className="text-gray-400">Next bill date :</p>
              <p>{dayjs(date).format('DD MMMM YYYY')}</p>
            </div>
            <>
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
            </>
          </div>

          <h1 className="text-[24px] font-bold mb-2">Clinic Details</h1>
          <div className="view-page-personal-details-container">
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Owner Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.name || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.clinic_name || ""}
                </span>
              </div>
            </div>
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic number<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.mobile_number || ""}
                </span>
              </div>

              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Email<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.email || ""}
                </span>
              </div>
            </div>
          </div>

          {/* <h1 className="text-[24px] font-bold mb-2">Payment Details</h1>
          <div className="view-page-personal-details-container">
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Owner Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.name || ""}
                </span>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.clinic_name || ""}
                </span>
              </div>
            </div>
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic number<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.mobile_number || ""}
                </span>
              </div>

              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Email<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.email || ""}
                </span>
              </div>
            </div>
          </div> */}
          


          <h1 className="text-[24px] font-bold mb-2">Certificates</h1>

          <div className="view-page-certificate-container mb-6">
            {details?.certificate && (
              <div className="view-page-certificate-container-image">
                {details?.certificate?.split(".")?.pop() === "pdf" ? (
                  <div
                    onClick={() => window.open(details?.certificate, "_blank")}
                    className="view-page-certificate-container-image-view flex items-center justify-center"
                  >
                    <BiSolidFilePdf color="#FF2D00" size={60} />
                  </div>
                ) : (
                  <img
                    onClick={() => window.open(details?.certificate, "_blank")}
                    src={details?.certificate || ""}
                    className="view-page-certificate-container-image-view"
                  />
                )}
                <div className="view-page-certificate-container-image-name-container">
                  {details?.certificate?.split(".")?.pop() === "pdf" ? (
                    <BiSolidFilePdf color="#d8d8d8" size={40} />
                  ) : (
                    <FaFileImage color="#d8d8d8" size={40} />
                  )}
                  <p className="view-page-certificate-container-image-name">
                    <span className="text-[13px] ">
                      {details?.certificate &&
                      details?.certificate &&
                      details?.certificate?.split("/").pop().length > 10
                        ? details?.certificate
                            ?.split("/")
                            .pop()
                            .substring(0, 10) +
                          "." +
                          details?.certificate?.split(".")?.pop()
                        : details?.certificate?.split("/")?.pop()}
                    </span>
                  </p>
                </div>
              </div>
            )}
            {details?.certificate2 && (
              <div className="view-page-certificate-container-image">
                {details?.certificate2?.split(".")?.pop() === "pdf" ? (
                  <div
                    onClick={() => window.open(details?.certificate2, "_blank")}
                    className="view-page-certificate-container-image-view flex items-center justify-center"
                  >
                    <BiSolidFilePdf color="#FF2D00" size={60} />
                  </div>
                ) : (
                  <>
                    <img
                      onClick={() =>
                        window.open(details?.certificate2, "_blank")
                      }
                      src={details?.certificate2 || ""}
                      className="view-page-certificate-container-image-view"
                    />
                  </>
                )}
                <div className="view-page-certificate-container-image-name-container">
                  {details?.certificate2?.split(".")?.pop() === "pdf" ? (
                    <BiSolidFilePdf color="#d8d8d8" size={40} />
                  ) : (
                    <FaFileImage color="#d8d8d8" size={40} />
                  )}
                  <p className="view-page-certificate-container-image-name">
                    <span className="text-[13px] ">
                      {details?.certificate2?.split("/").pop().length > 10
                        ? details?.certificate2
                            ?.split("/")
                            .pop()
                            .substring(0, 10) +
                          "." +
                          details?.certificate2?.split(".")?.pop()
                        : details?.certificate2?.split("/")?.pop()}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {details?.certificate3 && (
              <div className="view-page-certificate-container-image">
                {details?.certificate3?.split(".")?.pop() === "pdf" ? (
                  <div
                    onClick={() => window.open(details?.certificate3, "_blank")}
                    className="view-page-certificate-container-image-view flex items-center justify-center"
                  >
                    <BiSolidFilePdf color="#FF2D00" size={60} />
                  </div>
                ) : (
                  <img
                    onClick={() => window.open(details?.certificate3, "_blank")}
                    src={details?.certificate3 || ""}
                    className="view-page-certificate-container-image-view"
                  />
                )}
                <div className="view-page-certificate-container-image-name-container">
                  {details?.certificate3?.split(".")?.pop() === "pdf" ? (
                    <BiSolidFilePdf color="#d8d8d8" size={40} />
                  ) : (
                    <FaFileImage color="#d8d8d8" size={40} />
                  )}
                  <p className="view-page-certificate-container-image-name">
                    <span className="text-[13px] ">
                      {details?.certificate3?.split("/").pop().length > 10
                        ? details?.certificate3
                            ?.split("/")
                            .pop()
                            .substring(0, 10) +
                          "." +
                          details?.certificate3?.split(".")?.pop()
                        : details?.certificate3?.split("/")?.pop()}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {(details?.certificate ||
            details?.certificate2 ||
            details?.certificate3) && (
            <div className="certificate-verify-button-container">
              {verifyCertificate ? (
                <button className="certificate-verify-button2">
                  <ClipLoader color="#fff" size={20} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    !details?.certificateVerified && handleVerifyCertificate()
                  }
                  className={`certificate-verify-button2 ${
                    !details?.certificateVerified
                      ? "bg-primary_color"
                      : "bg-gray-400"
                  }`}
                  disabled={!details?.certificateVerified ? false : true}
                >
                  {!details?.certificateVerified
                    ? "Verify Certificate"
                    : "Verified"}
                </button>
              )}
            </div>
          )}

          {(details?.certificate ||
            details?.certificate2 ||
            details?.certificate3) && (
            <div className="flex items-center justify-center mt-16">
              {verifyClinic ? (
                <button
                  className={`bg-primary_color text-white w-[300px] py-3 rounded-lg`}
                >
                  <ClipLoader color="#fff" size={20} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    details?.certificateVerified &&
                    !details?.adminVerified &&
                    handleVerifyClinic()
                  }
                  className={`${
                    details?.certificateVerified && !details?.adminVerified
                      ? "bg-primary_color"
                      : "bg-gray-400"
                  }  text-white w-[300px] py-3 rounded-lg `}
                  disabled={
                    details?.certificateVerified && !details?.adminVerified
                      ? false
                      : true
                  }
                >
                  {!details?.adminVerified ? "Verify Clinic" : "Verified"}
                </button>
              )}
            </div>
          )}
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

export default ViewPage;
