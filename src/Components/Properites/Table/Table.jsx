import React, { useState } from "react";

import { TbEye } from "react-icons/tb";

import Toggle from "../toggle/toggle";

import ModelResponsive from "./ModelResponsive";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  setDoctorView,
  setReceptionistView,
} from "../../../Redux/Slice/Clinic";
import { addClinicID, addStaffID } from "../../../Redux/Slice/StaffList";
import ModelPopup from "../ModelPopup/ModelPopup";
import { IoClose } from "react-icons/io5";

dayjs.extend(customParseFormat);

const Table = ({
  headers,
  tableBody,
  tableName,
  setviewPage,
  id,
  model,
  setModel,
  model1,
  setModel1,
  handleChange,
  loader,
  clear,
  setClear,
  primaryLoader,
  handleChangeStatusDoctor,
  handleChangeStatusReceptionist,
}) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    id: "",
    value: "",
  });
  const [balanceDuePopup, setBalanceDuePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [popUpModel, setPopUpModel] = useState("");

  // Current date
  const currentDateFormat = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs().format("HH:mm:ss");

  const handleBalanceModel = () => {
    setBalanceDuePopup(!balanceDuePopup);
  };

  const { clinic_id } = useSelector((state) => state.staffList);

  console.log("selectedItem", selectedItem);

  return (
    <>
      <table className="relative text-sm font-medium text-nowrap border-collapse font-poppins w-full ">
        <thead className=" text-[16px] font-semibold h-[10%] sticky top-0 bg-white z-30">
          <tr>
            {headers?.map((head, i) => (
              <td key={i} className={` text-start py-2 px-10`}>
                {head?.title}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {tableBody?.map((item, i) => {
            const DateString = item?.subscription_enddate?.split(" ")?.[0];
            const DateTime = item?.subscription_enddate?.split(" ")?.[1];
            const dueDate = dayjs(DateString, "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            );
            const planDate = `${dueDate}T${DateTime}`;
            const currentDate = `${currentDateFormat}T${currentTime}`; // Example of another date
            const planDateObj = dayjs(planDate);
            const currentDateObj = dayjs(currentDate);

            // Check if date is greater than otherDate
            const isGreaterThan = currentDateObj.isAfter(planDateObj);

            if (tableName === "clinic") {
              return (
                <>
                  {primaryLoader ? (
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <ClipLoader size={40} color="#000" />
                    </div>
                  ) : (
                    <>
                      {tableBody?.length === 0 ? (
                        <div className="absolute w-full h-full flex items-center justify-center">
                          <p className=" text-[18px] font-bold">
                            No record found
                          </p>
                        </div>
                      ) : (
                        <tr className="border-b font-medium text-start" key={i}>
                          <td className={`py-2 px-10`}>{i + 1}</td>
                          <td
                            className={`py-2 px-10 flex items-center justify-start gap-3`}
                          >
                            {item?.name}
                          </td>

                          <td className={`py-2 px-10`}>{item?.clinic_name}</td>
                          <td
                            className={`py-2 px-10 flex items-center justify-start gap-3`}
                          >
                            +91 {item?.mobile_number}
                          </td>
                          <td className={`py-2 px-10`}>
                            {item?.adminVerified ? (
                              <p className="text-green_dark border-[2px] border-green-100 bg-green-50 rounded-full text-[14px] w-[100px] h-[25px] flex items-center justify-center">
                                Verified
                              </p>
                            ) : (
                              <p className="text-orange_dark border-[1px] border-orange-200 bg-orange-100 rounded-full w-[100px] h-[25px] text-[14px] flex items-center justify-center">
                                Not Verified
                              </p>
                            )}
                          </td>
                          <td className={`py-2 px-10 text-center`}>
                            {item?.remainingDays === 0
                              ? `${Math.abs(item.remainingHours)} Hours`
                              : `${item.remainingDays} Day`}
                          </td>
                          <td className={`py-2 px-10 text-center`}>
                            {item?.doctorsCount < 9
                              ? `0${item?.doctorsCount}`
                              : item?.doctorsCount}
                          </td>

                          <td className={`py-2 px-10 text-center`}>
                            {item?.receptionistsCount < 9
                              ? `0${item?.receptionistsCount}`
                              : item?.receptionistsCount}
                          </td>

                          <td className={`py-2 px-10 text-center`}>
                            {item?.totalStaffCount < 9
                              ? `0${item?.totalStaffCount}`
                              : item?.totalStaffCount}
                          </td>
                          <td className={`py-2`}>
                            <div className="flex items-center space-x-4">
                              <p
                                className={`${
                                  !item?.block
                                    ? "text-red-400"
                                    : "text-gray-300"
                                } font-semibold w-[60px] text-end`}
                              >
                                {item?.block ? "UnBlock" : "Block"}
                              </p>
                              <Toggle
                                checked={item?.block}
                                onChange={(e) => {
                                  setPopUpModel("");
                                  setDetails({
                                    id: item._id,
                                    value: e,
                                  });
                                  setModel(!model);
                                }}
                              />
                            </div>
                          </td>
                          <td className={`py-2`}>
                            <div className="flex items-center space-x-4">
                              <p
                                className={`${
                                  !item?.subscription
                                    ? "text-red-400"
                                    : "text-gray-300"
                                } font-semibold w-[60px] text-end`}
                              >
                                {item?.subscription ? "Paid" : "Unpaid"}
                              </p>
                              <Toggle
                                checked={item?.subscription}
                                onChange={(e) => {
                                  setPopUpModel("Subscription");
                                  setDetails({
                                    id: item._id,
                                    value: e,
                                  });
                                  setModel1(!model);
                                }}
                              />
                            </div>
                          </td>
                          <td className={`py-2 px-10`}>
                            <div
                              onClick={() => {
                               
                                id(item._id);
                                dispatch(addClinicID(item._id));
                                setviewPage(true);
                              }}
                              className="flex items-center justify-start gap-6"
                            >
                              <TbEye
                                size={30}
                                className="text-gray-300 hover:text-blue-400 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </>
              );
            }

            if (tableName == "subscription") {
              return (
                <tr className="border-b font-medium text-start" key={i}>
                  <td className={`py-2 px-10`}>{i + 1}</td>
                  <td className={`py-2 px-10`}>{item?.name}</td>
                  <td className={`py-2 px-10 text-center`}>
                    {item?.subscription_id}
                  </td>
                  <td className={`py-2 px-10`}>{item?.transaction_id}</td>
                  <td className={`py-2 px-10`}>{item?.durationInNo} </td>
                  <td className={`py-2 px-10`}>
                    {dayjs(dueDate).isValid() ? (
                      <>
                        {dayjs(dueDate).diff(currentDate, "day") < 0
                          ? "Plan Expired"
                          : dayjs(dueDate).diff(currentDate, "day") === 0 &&
                            isGreaterThan
                          ? "Plan Expired"
                          : `${dayjs(dueDate).diff(currentDate, "day")} Day${
                              dayjs(dueDate).diff(currentDate, "day") !== 1
                                ? "s"
                                : ""
                            }`}
                      </>
                    ) : (
                      "----"
                    )}
                  </td>

                  <td className={`py-2 px-10`}>₹ {item?.price}</td>
                  <td className={`py-2 px-10`}>
                    <div className="flex items-center justify-start gap-6">
                      <TbEye
                        onClick={() => {
                          setSelectedItem(item);
                          handleBalanceModel();
                        }}
                        size={30}
                        className="text-gray-300 hover:text-blue-400 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              );
            }
            if (tableName == "doctorList") {
              return (
                <tr className="border-b font-medium text-start" key={i}>
                  <td className={`py-2 px-10`}>{i + 1}</td>
                  <td className={`py-2 px-10`}>{item?.doctor?.name}</td>
                  <td className={`py-2 px-10`}>
                    <p className="text-dark_purple border-[2px] border-[#dfc5fd] bg-[#f0e5fd] rounded-full flex items-center justify-center">
                      {item?.doctor?.specialist}
                    </p>
                  </td>

                  <td className={`py-2`}>
                    <div className=" flex items-center space-x-4">
                      <p
                        className={`${
                          !item?.doctor?.clinics?.[0]?.subscription
                            ? "text-red-400"
                            : "text-gray-300"
                        } font-semibold w-[60px] text-end`}
                      >
                        {item?.doctor?.clinics?.[0]?.subscription
                          ? "Paid"
                          : "NotPaid"}
                      </p>
                      <Toggle
                        checked={item?.doctor?.clinics?.[0]?.subscription}
                        onChange={(e) => {
                          handleChangeStatusDoctor({
                            doctor_id: item?.doctor._id,
                            status: e,
                            clinic_id: clinic_id,
                          });
                        }}
                      />
                    </div>
                  </td>

                  <td className={`py-2 px-10`}>
                    <div
                      onClick={() => {
                        dispatch(addStaffID(item?.doctor?._id));
                        dispatch(setDoctorView());
                      }}
                      className="flex items-center justify-start gap-6"
                    >
                      <TbEye
                        size={30}
                        className="text-gray-300 hover:text-blue-400 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              );
            }

            if (tableName == "receptionistList") {
              return (
                <tr className="border-b font-medium text-start" key={i}>
                  <td className={`py-2 px-10`}>{i + 1}</td>
                  <td className={`py-2 px-10`}>{item.name}</td>
                  <td className={`py-2 px-5`}>
                    <div className=" flex items-center space-x-4">
                      <p
                        className={`${
                          !item.subscription ? "text-red-400" : "text-gray-300"
                        } font-semibold w-[60px] text-end`}
                      >
                        {item.subscription ? "Paid" : "NotPaid"}
                      </p>
                      <Toggle
                        checked={item.subscription}
                        onChange={(e) => {
                          handleChangeStatusReceptionist({
                            receptionist_id: item._id,
                            status: e,
                          });
                        }}
                      />
                    </div>
                  </td>
                  <td className={`py-2 px-10`}>
                    <div
                      onClick={() => {
                        dispatch(addStaffID(item?._id));
                        dispatch(setReceptionistView());
                      }}
                      className="flex items-center justify-start gap-6"
                    >
                      <TbEye
                        size={30}
                        className="text-gray-300 hover:text-blue-400 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              );
            }

            if (tableName === "Support") {
              return (
                <tr className="border-b font-medium text-start" key={i}>
                  <td className={`py-2 px-10`}>{i + 1}</td>
                  <td className={`py-2 px-10`}>{item?.name}</td>
                  <td className={`py-2 px-10`}>
                    {item?.clinicId?.clinic_name}
                  </td>
                  <td className={`py-2 px-10`}>{item?.email}</td>
                  <td className={`py-2 px-10`}>{item?.mobile_number}</td>
                  <td
                    className="py-2 px-10"
                    data-tooltip-target="tooltip-default"
                  >
                    {item?.description?.slice(0, 25)}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <ModelResponsive
        popUpModel={popUpModel}
        modalpopup={model ? model : model1}
        openModal={model ? setModel : setModel1}
        trigger={handleChange}
        details={details}
        clear={clear}
        setClear={setClear}
        loader={loader}
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
            <h1 className=" text-[22px] font-semibold">Billing History </h1>
            {selectedItem?.duration && (
              <>
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
                    {selectedItem?.name}
                  </h1>
                  <h1 className=" col-span-1 text-[16px] font-normal text-end">
                    {selectedItem?.durationInNo} {selectedItem?.duration}
                  </h1>
                  <h1 className=" col-span-1 text-[16px] font-bold text-end">
                    ₹
                    {selectedItem?.pricePerMonth
                      ? selectedItem?.pricePerMonth
                      : selectedItem?.price}
                  </h1>
                </div>

                <div className="w-full h-[2px] bg-light_gray my-3"></div>
              </>
            )}

            <>
              {selectedItem?.doctor && selectedItem?.doctor !== 0 ? (
                <>
                  <div className="grid grid-cols-3 mt-6 overflow-auto">
                    <h1 className=" col-span-2 text-[16px] font-bold">
                      Doctors Count
                    </h1>
                    <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
                  </div>

                  <div className="grid grid-cols-3 mt-3">
                    <h1 className=" col-span-2 text-[16px] font-normal">
                      Doctors x
                    </h1>
                    <h1 className=" col-span-1 text-[16px] font-normal text-end">
                      {selectedItem?.doctor < 9
                        ? `0${selectedItem?.doctor}`
                        : selectedItem?.doctor}
                    </h1>
                  </div>
                  <div className="w-full h-[2px] bg-light_gray my-3"></div>
                </>
              ) : null}
              {selectedItem?.receptionist &&
              selectedItem?.receptionist !== 0 ? (
                <>
                  <div className="grid grid-cols-3 mt-6 overflow-auto">
                    <h1 className=" col-span-2 text-[16px] font-bold">
                      Receptionist Count
                    </h1>
                    <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
                  </div>

                  <div className="grid grid-cols-3 mt-3">
                    <h1 className=" col-span-2 text-[16px] font-normal">
                      Receptionist x
                    </h1>
                    <h1 className=" col-span-1 text-[16px] font-normal text-end">
                      {selectedItem?.receptionist < 9
                        ? `0${selectedItem?.receptionist}`
                        : selectedItem?.receptionist}
                    </h1>
                  </div>
                  <div className="w-full h-[2px] bg-light_gray my-3"></div>
                </>
              ) : null}

              <div className="grid grid-cols-5 mt-6 overflow-auto">
                <h1 className=" col-span-2 text-[16px] font-bold">Price</h1>
                <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
                <h1 className=" col-span-1 text-[16px] font-bold text-end"></h1>
                <h1 className=" col-span-1 text-[16px] font-bold text-end">
                  ₹{selectedItem?.price}
                </h1>
              </div>
            </>
          </div>
        </div>
      </ModelPopup>
    </>
  );
};

export default Table;
