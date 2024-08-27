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
import Table from "../Table/Table";
import ModelPopup from "../ModelPopup/ModelPopup";
import { IoClose } from "react-icons/io5";

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
    setStep,
    step,
    balanceDuePopup,
    handleBalanceModel,
    handleChangeStatusDoctor,
    handleChangeStatusReceptionist,
    balanceDueShow,
  } = ViewPageFunction({ id });

  const { details } = useSelector((state) => state.DetailsPage);

  const { doctor_list, receptionist_list } = useSelector(
    (state) => state.staffList
  );

  const { balance_due } = useSelector((state) => state.Clinic);

  const transformedData = details?.subscription_details.flatMap((item) => {
    const subscriptionDetails = item.subscription_id
      ? {
          duration: item?.subscription_id?.duration,
          durationInNo: item?.subscription_id?.durationInNo,
          price: item?.subscription_id?.pricePerMonth,
          name: item?.subscription_id?.title?.title
            ? item?.subscription_id?.title?.title
            : "----",
          subscription_startdate: item?.subscription_startdate,
          subscription_enddate: item?.subscription_enddate,
          subscription_id: item?.subscription_id._id,
          id: item?._id,
        }
      : null;

    const billingHistoryDetails = item?.billinghistory
      .filter((history) => history?.doctor !== 0 || history?.receptionist !== 0)
      .map((history) => ({
        transaction_id: history?.transaction_id
          ? history?.transaction_id
          : "----",
        price: history?.amount ? history?.amount : 0,
        doctor: history?.doctor,
        receptionist: history?.receptionist,
        _id: history?._id,
        subscription_id: item?.subscription_id
          ? item?.subscription_id?._id
          : "----",
        id: item?._id,
        duration: item?.subscription_id?.duration,
        durationInNo: item?.subscription_id?.durationInNo,
        pricePerMonth: item?.subscription_id?.pricePerMonth,
        name: item?.subscription_id?.title?.title
          ? item?.subscription_id?.title?.title
          : "----",
      }));

    return subscriptionDetails
      ? [subscriptionDetails, ...billingHistoryDetails]
      : billingHistoryDetails;
  });

  const subscriptionDetails = transformedData || [];

  const [detailsAction, setDetailsAction] = useState({
    id: "",
    value: "",
  });

  const dateString =
    details?.subscription_details[details?.subscription_details?.length - 1];

  let date = null;

  const TimeString = dateString?.subscription_enddate?.split(" ")[1];

  if (dateString) {
    const DateString = dateString?.subscription_enddate?.split(" ")[0];

    const [day, month, year] = DateString?.split("-");
    date = new Date(year, month - 1, day);
  }

  // Current date
  const currentDateFormat = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs().format("HH:mm:ss");

  const DateString = dateString?.subscription_enddate?.split(" ")?.[0];
  const DateTime = dateString?.subscription_enddate?.split(" ")?.[1];
  const dueDate = dayjs(DateString).format("YYYY-MM-DD");
  const planDate = `${dueDate}T${DateTime}`;
  const currentDate = `${currentDateFormat}T${currentTime}`; // Example of another date
  const planDateObj = dayjs(planDate);
  const currentDateObj = dayjs(currentDate);

  // Check if date is greater than otherDate
  const isGreaterThan = currentDateObj.isAfter(planDateObj);

  return (
    <div className=" w-full h-full relative">
      {loader ? (
        <div className="flex items-center justify-center w-full h-full">
          <ClipLoader size={40} />
        </div>
      ) : (
        <>
          <div className="View-page-top sticky z-50 top-0 bg-white">
            <h1 className="view-page-top-text flex items-center gap-3">
              <IoMdArrowRoundBack
                className="cursor-pointer"
                onClick={() => {
                  step === 1 ? setviewPage(false) : setStep(1);
                }}
              />
              {headerText}
            </h1>
          </div>

          {step === 1 && (
            <div className="view-page-button-container">
              {isGreaterThan ? (
                <>
                  Current Plan : <strong className="text-black">Expired</strong>
                </>
              ) : (
                <div className=" flex items-start gap-1">
                  <p className="text-gray-400">Next bill date:</p>
                  <p>
                    {dayjs(date).format("DD MMMM YYYY")} {TimeString}
                  </p>
                </div>
              )}
              <div className=" flex items-center flex-wrap gap-3 ">
                <button
                  onClick={() => setStep(2)}
                  className="border-[2px] !border-blue !text-blue view-page-button"
                >
                  Billing history
                </button>
                {balanceDueShow && (
                  <button
                    onClick={handleBalanceModel}
                    className="border-[2px] !border-red-500 !text-red-500 view-page-button"
                  >
                    Balance Due
                  </button>
                )}
                {details?.certificateVerified && details?.adminVerified && (
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
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className=" w-full h-full overflow-auto pb-3">
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

              <h1 className="text-[24px] font-bold mb-2">Doctor List</h1>

              <div className="w-full min-h-[350px] max-h-[350px] mb-6">
                <div className=" w-full h-[85%] overflow-auto p-3">
                  <Table
                    headers={[
                      { title: "S.No" },
                      { title: "Doctor Name" },
                      { title: "Specialist" },
                      { title: "Paid" },
                      { title: "View" },
                    ]}
                    tableBody={doctor_list}
                    tableName="doctorList"
                    handleChangeStatusDoctor={handleChangeStatusDoctor}
                  />
                </div>
              </div>

              <h1 className="text-[24px] font-bold mb-2">Receptionist List</h1>

              <div className="w-full min-h-[350px] max-h-[350px] mb-6">
                <div className=" w-full h-[85%] overflow-auto p-3">
                  <Table
                    headers={[
                      { title: "S.No" },
                      { title: "Receptionist Name" },
                      { title: "Paid" },
                      { title: "View" },
                    ]}
                    tableBody={receptionist_list}
                    tableName="receptionistList"
                    handleChangeStatusReceptionist={
                      handleChangeStatusReceptionist
                    }
                  />
                </div>
              </div>

              <h1 className="text-[24px] font-bold mb-2">Certificates</h1>

              <div className="view-page-certificate-container mb-6">
                {details?.certificate && (
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
                        onClick={() =>
                          window.open(details?.certificate2, "_blank")
                        }
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
                        onClick={() =>
                          window.open(details?.certificate3, "_blank")
                        }
                        className="view-page-certificate-container-image-view flex items-center justify-center"
                      >
                        <BiSolidFilePdf color="#FF2D00" size={60} />
                      </div>
                    ) : (
                      <img
                        onClick={() =>
                          window.open(details?.certificate3, "_blank")
                        }
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
                        !details?.certificateVerified &&
                        handleVerifyCertificate()
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
            </div>
          )}

          {step === 2 && (
            <>
              <div className=" w-full h-[85%] overflow-auto p-3">
                <Table
                  headers={[
                    { title: "S.No" },
                    { title: "Name" },
                    { title: "Subscription ID" },
                    { title: "Transcation ID" },
                    { title: "Duration" },
                    { title: "Remaining days" },
                    { title: "Amount" },
                    { title: "View" },
                  ]}
                  tableBody={subscriptionDetails}
                  tableName="subscription"
                  date={date}
                />
              </div>
            </>
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

      <ModelPopup showDrawer={balanceDuePopup} height="90%" width="90%">
        <div className=" w-full h-full overflow-hidden ">
          <div className="relative">
            <button
              onClick={handleBalanceModel}
              className=" absolute right-3 hover:text-red-500 transition-all duration-300"
            >
              <IoClose size={20} />
            </button>
          </div>

          <div className=" w-[95%] h-[90%] mx-auto overflow-auto mt-6">
            <h1 className=" text-[22px] font-semibold">Balance Due </h1>
            <div className="grid grid-cols-4 mt-3 overflow-auto">
              <h1 className=" col-span-2 text-[16px] font-bold">
                Subscription Name
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Duration
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Price
              </h1>
            </div>
            <div className="grid grid-cols-4 mt-3">
              <h1 className=" col-span-2 text-[16px] font-normal">
                {balance_due?.subscriptionDurations?.title?.title}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-normal text-end">
                {balance_due?.subscriptionDurations?.durationInNo}{" "}
                {balance_due?.subscriptionDurations?.duration}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                ₹{balance_due?.subscriptionDurations?.pricePerMonth}
              </h1>
            </div>

            <div className="w-full h-[2px] bg-light_gray my-3"></div>

            <div className="grid grid-cols-5 mt-6 overflow-auto">
              <h1 className=" col-span-2 text-[16px] font-bold">
                Doctors Count
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Paid
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Unpaid
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Balance Due
              </h1>
            </div>

            <div className="grid grid-cols-5 mt-3">
              <h1 className=" col-span-2 text-[16px] font-normal">
                Doctors x{" "}
                {Number(balance_due?.doctors?.subscribed) +
                  Number(balance_due?.doctors?.unsubscribed)}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-normal text-end">
                {balance_due?.doctors.subscribed}
              </h1>
              <h1 className=" col-span-1 text-[16px]  text-end">
                {balance_due?.doctors?.unsubscribed}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end text-red-500">
                ₹{balance_due?.doctors?.unsubscriptionAmount}
              </h1>
            </div>
            <div className="w-full h-[2px] bg-light_gray my-3"></div>

            <div className="grid grid-cols-5 mt-6 overflow-auto">
              <h1 className=" col-span-2 text-[16px] font-bold">
                Receptionist Count
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Paid
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Unpaid
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Balance Due
              </h1>
            </div>

            <div className="grid grid-cols-5 mt-3">
              <h1 className=" col-span-2 text-[16px] font-normal">
                Receptionist x{" "}
                {Number(balance_due?.receptionists?.subscribed) +
                  Number(balance_due?.receptionists?.unsubscribed)}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-normal text-end">
                {balance_due?.receptionists.subscribed}
              </h1>
              <h1 className=" col-span-1 text-[16px]  text-end">
                {balance_due?.receptionists?.unsubscribed}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end text-red-500">
                ₹ {balance_due?.receptionists.unsubscriptionAmount}
              </h1>
            </div>
            <div className="w-full h-[2px] bg-light_gray my-3"></div>

            <div className="grid grid-cols-5 mt-6">
              <h1 className=" col-span-2 text-[16px] font-bold"></h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Balance Due{" "}
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end text-red-500">
                ₹{balance_due?.totalUnsubscriptionAmount}
              </h1>
            </div>

            <div className="grid grid-cols-5 mt-6 overflow-auto">
              <h1 className=" col-span-2 text-[16px] font-bold"></h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                Total Amount
              </h1>
              <h1 className=" col-span-1 text-[16px] font-bold text-end">
                ₹{balance_due?.totalUnsubscriptionAmount}
              </h1>
            </div>
          </div>
        </div>
      </ModelPopup>
    </div>
  );
};

export default ViewPage;
