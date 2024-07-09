import React from "react";

import { BiSolidFilePdf } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

import ViewPageFunction from "../../../hooks/ViewDetails/ViewPage";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const ViewPage = ({ setviewPage, headerText, id }) => {
  const {
    loader,
    handleVerifyCertificate,
    handleVerifyClinic,
    verifyCertificate,
    verifyClinic,
  } = ViewPageFunction({ id });

  const { details } = useSelector((state) => state.DetailsPage);

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

          <h1 className="text-[24px] mt-16 font-bold mb-2">Clinic Details</h1>
          <div className="view-page-personal-details-container">
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic Name<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.clinic_name || ""}
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
            <div className="view-page-personal-details-container-body">
              <div className="w-full flex items-center gap-2">
                <span className="view-page-personal-details-container-body-details-key">
                  Clinic number<span>:</span>
                </span>
                <span className="view-page-personal-details-container-body-details-value">
                  {details?.mobile_number || ""}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-[24px] font-bold mb-2">Certificate</h1>

          <div className="view-page-certificate-container mb-6">
            <div className="view-page-certificate-container-image">
              <img
                src={details?.certificate || ""}
                className="view-page-certificate-container-image-view"
              />
              <div className="view-page-certificate-container-image-name-container">
                <BiSolidFilePdf color="#FF2D00" size={40} />
                <p className="view-page-certificate-container-image-name">
                  <span className="text-[13px] ">certificate1</span>
                </p>
              </div>
            </div>
          </div>

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

          <div className="flex items-center justify-center mt-16">
            {verifyClinic ? (
              <button
                className={`bg-primary_color text-white w-[300px] py-3 rounded-lg`}
              >
                <ClipLoader color="#fff" size={20} />
              </button>
            ) : (
              <button
                onClick={() => !details?.adminVerified && handleVerifyClinic()}
                className={`${
                  !details?.adminVerified ? "bg-primary_color" : "bg-gray-400"
                }  text-white w-[300px] py-3 rounded-lg `}
                disabled={!details?.adminVerified ? false : true}
              >
                {!details?.adminVerified ? "Verify Clinic" : "Verified"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPage;
