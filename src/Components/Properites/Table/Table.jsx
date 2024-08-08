import React, { useState } from "react";

import { TbEye } from "react-icons/tb";

import Toggle from "../toggle/toggle";

import ModelResponsive from "./ModelResponsive";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";

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
}) => {
  const [details, setDetails] = useState({
    id: "",
    value: "",
  });
  const [popUpModel, setPopUpModel] = useState("");

  // Current date
  const currentDateFormat = dayjs().format('YYYY-MM-DD')
  const currentTime = dayjs().format('HH:mm:ss')


  return (
    <>
      <table className="relative text-sm font-medium text-nowrap border-collapse font-poppins w-full ">
        <thead className=" text-[16px] font-semibold border-b-[2px] border-t-[2px] h-[10%] sticky top-0 bg-white z-30">
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
            const dueDate = dayjs(DateString).format('YYYY-MM-DD')
            const planDate = `${dueDate}T${DateTime}`;
            const currentDate  = `${currentDateFormat}T${currentTime}`; // Example of another date
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
                          <td className={`py-2 px-10`}>
                            {item?.remainingDays === 0
                              ? `${Math.abs(item.remainingHours)} Hours`
                              : `${item.remainingDays} Day`}
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
                  <td className={`py-2 px-10`}>
                    {item?.subscription_id?.title?.title}
                  </td>
                  <td className={`py-2 px-10`}>{item?.subscription_id?._id}</td>
                  <td className={`py-2 px-10`}>{item?.transaction_id}</td>
                  <td className={`py-2 px-10`}>
                    {item?.subscription_id?.durationInNo}{" "}
                    {item?.subscription_id?.duration}
                  </td>
                  <td className={`py-2 px-10`}>
                    {dayjs(DateString).diff(currentDate, "day") < 0
                      ? "Plan Expired"
                      : dayjs(DateString).diff(currentDate, "day") === 0 &&
                        isGreaterThan
                      ? "Plan Expired"
                      : `${dayjs(DateString).diff(currentDate, "day")} Day`}
                  </td>
                  <td className={`py-2 px-10`}>
                    ₹ {item?.subscription_id?.pricePerMonth}
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
    </>
  );
};

export default Table;
