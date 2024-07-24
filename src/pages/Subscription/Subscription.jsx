import React, { useState } from "react";

import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { PiCurrencyInrBold } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import SubscriptionFunction from "../../hooks/Subscription/Subscription";
import Select from "../../Components/Properites/Select/Select";
import { MdDelete } from "react-icons/md";

import ModelResponsive from "./ModelResponsive";

const Subscription = () => {
  const {
    CreatePlanName,
    planNameloader,
    setplanName,
    planName,
    style,
    selectPlanName,
    setSelectPlanName,
    fetchLoader,
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
    step,
    setStep,
    AddFeature,
    featurevalue,
    setFeaturevalue,
    RemoveFeature,
    addFeatureError,
    setaddFeatureError,
    features,
    handleEdit,
    handleUpdate,
    model,
    setmodel,
    handleDelete,
  } = SubscriptionFunction();

  const { subscriptionNames, subscriptionCard } = useSelector(
    (state) => state.subscription
  );

  const [indexID, setIndexID] = useState(null);
  const [details, setDetails] = useState(null);

  return (
    <div className="container px-1">
      <div className="table-box ">
        <div className=" flex  items-start justify-between flex-wrap gap-2 px-1 pb-6">
          <h1 className="text-[22px] font-semibold  flex items-center gap-3">
            {(step === 2 || step === 3) && (
              <IoMdArrowRoundBack
                onClick={() => setStep(1)}
                size={25}
                className="cursor-pointer"
              />
            )}
            Subscription Plan Template {step === 1 ? "Preview" : step === 2 ? "Create" : "Update"}
          </h1>
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className=" border-[1px] border-blue hover:bg-blue hover:text-white transition-all duration-300 px-4 py-1 rounded-md text-blue"
            >
              Create Plan
            </button>
          )}
        </div>

        {step === 1 && (
          <div
            style={{
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
            }}
            className="w-[98%] mx-auto h-[90%] overflow-auto  rounded-3xl  p-4"
          >
            <div className=" flex items-start justify-between flex-wrap">
              <div>
                <h1 className=" text-[24px] font-semibold p-2 pb-0">
                  Choose your plan
                </h1>
                <h1 className="flex items-center gap-3 p-2 font-semibold">
                  <MdOutlineRocketLaunch
                    size={20}
                    className="text-green_light"
                  />{" "}
                  2 month Free trail
                </h1>
              </div>
              {/* <div
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                  
                }}
                className="w-[250px] py-2 flex items-center justify-around px-3 rounded-md gap-4"
              >
                <p
                  style={{
                    boxShadow:
                      selected === "Monthly" &&
                      "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
                  }}
                  onClick={() => setselected("Monthly")}
                  className={`${
                    selected === "Monthly"
                      ? "text-white bg-green-600"
                      : "text-black"
                  }  py-1 rounded-lg w-full text-center cursor-pointer transition-all duration-500`}
                >
                  Monthly
                </p>
                <p
                  style={{
                    boxShadow:
                      selected === "Yearly" &&
                      "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
                  }}
                  onClick={() => setselected("Yearly")}
                  className={`${
                    selected === "Yearly"
                      ? "text-white bg-green-600"
                      : "text-black"
                  }  py-1 rounded-lg w-full text-center cursor-pointer transition-all duration-500`}
                >
                  Yearly
                </p>
              </div> */}
            </div>

            <div className="w-full h-[80%] overflow-auto grid gap-8 2xl:p-4 xl:p-4 lg:p-4 md:p-4 sm:p-4 xs:p-1 mobile:p-1 xss:p-0  2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 mobile:grid-cols-1 xss:grid-cols-1 mt-3">
              {subscriptionCard?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
                    }}
                    onMouseEnter={() => setIndexID(index)}
                    onMouseLeave={() => setIndexID(null)}
                    className="rounded-md px-4 w-full h-full py-3 relative"
                  >
                    {indexID === index && (
                      <div className="absolute animate-pulse top-4 flex items-center gap-2 right-4 border-[1px] border-black cursor-pointer transition-all duration-300 rounded-full p-1">
                        <MdModeEditOutline
                          onClick={() => handleEdit(item.cardID)}
                          size={15}
                          className="hover:text-blue"
                        />
                        <hr className=" bg-red-400 w-[2px] h-[20px]" />
                        <IoMdTrash
                          onClick={() => {
                            setDetails(item.cardID)
                            setmodel(true)
                          }}
                          size={15}
                          className="hover:text-red-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center pt-4 justify-start mx-auto w-[80%]">
                      <p
                        className={`${
                          index === 0
                            ? "bg-purple-500"
                            : index === 1
                            ? "bg-green_light"
                            : "bg-blue"
                        } w-[22px] h-[22px] rounded-full flex items-center justify-center bg-opacity-[.4]`}
                      >
                        <p
                          className={`${
                            index === 0
                              ? "bg-purple-800"
                              : index === 1
                              ? "bg-green_light"
                              : "bg-blue"
                          } w-[15px] h-[15px] rounded-full`}
                        ></p>
                      </p>
                      <p
                        className={`text-[22px] font-semibold px-3 ${
                          index === 0
                            ? "text-purple-800"
                            : index === 1
                            ? "text-green_light"
                            : "text-blue"
                        }`}
                      >
                        {item?.title} Plan
                      </p>
                    </div>
                    <div className=" flex items-center justify-center w-[80%] py-3">
                      <p className="text-[34px] font-bold p-4 pr-0">
                        ₹{item?.price}
                      </p>
                      <p className="p-2 text-[16px] text-[#9d9d9d] pt-3">
                        / {item?.duration}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 pb-3">
                      {item?.feature?.map((feature, index) => (
                        <p
                          key={index}
                          className=" w-[80%] flex items-center gap-3 text-[16px] font-medium"
                        >
                          <FaPlus size={20} className="text-yellow-400" />{" "}
                          {feature || ""}
                        </p>
                      ))}
                    </div>
                    <div className=" w-full mt-4 text-center">
                      <button className=" w-[80%] py-3 rounded-2xl text-green_light hover:bg-green_light hover:text-white text-center border-[3px] border-green_light transition-all duration-300">
                        Get Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-3 pb-6">
              <label>Create Plan Name</label>
              <div className=" 2xl:w-[40%] xl:w-[40%] lg:w-[60%] md:w-[80%] sm:w-[80%] xs:w-[100%] mobile:w-[100%] xss:w-[100%]  py-2 flex items-center gap-2">
                <input
                  value={planName}
                  onChange={(e) => {
                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                      return setplanName(e.target.value);
                    }
                  }}
                  placeholder="Enter plan name"
                  className="bg-gray-200  py-2 px-3 rounded-lg outline-none flex-1"
                />
                {planNameloader ? (
                  <button className=" bg-blue text-white font-medium py-2 w-[100px] rounded-lg">
                    <ClipLoader size={20} color="#fff" />
                  </button>
                ) : (
                  <button
                    onClick={CreatePlanName}
                    className=" bg-blue text-white font-medium py-2 w-[100px] rounded-lg"
                  >
                    Create
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-3 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 mobile:grid-cols-1 xss:grid-cols-1">
              <div className=" relative flex flex-col gap-3 px-1 pb-6">
                <label>Select Plan</label>
                <div className="flex items-center gap-2 flex-1">
                  <Select
                    options={subscriptionNames || []}
                    styles={style}
                    placeholder="Select Plan"
                    SelectedValue={setSelectPlanName}
                    value={selectPlanName}
                    clear={true}
                  />
                  {fetchLoader && <ClipLoader size={20} color="#0073EE" />}
                  {validationError && !selectPlanName && (
                    <p className=" absolute bottom-0 text-red-500">Required</p>
                  )}
                </div>
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Duration</label>
                <Select
                  options={Options}
                  styles={style}
                  placeholder="Select Duration"
                  SelectedValue={setselectedDuration}
                  value={selectedDuration}
                  clear={true}
                />
                {validationError && !selectedDuration && (
                  <p className=" absolute bottom-0 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Duration No</label>
                <Select
                  options={DurationNumber}
                  styles={style}
                  placeholder="Select Duration"
                  SelectedValue={setSelectedDurationNumber}
                  value={selectedDurationNumber}
                  clear={true}
                />
                {validationError && !selectedDurationNumber && (
                  <p className=" absolute bottom-0 text-red-500">Required</p>
                )}
              </div>

              <div className=" relative flex flex-col gap-3 px-1 pb-6">
                <label>Price</label>
                <div className="flex items-center py-2 w-full bg-gray-200 px-3">
                  <input
                    value={pricevalue}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setPricevalue(e.target.value);
                      }
                    }}
                    type="text"
                    placeholder="Enter Price"
                    className=" flex-1 bg-gray-200 outline-none rounded-lg"
                  />
                  <PiCurrencyInrBold size={20} className=" text-gray-400" />
                </div>
                {validationError && pricevalue === "" && (
                  <p className=" absolute -bottom-1 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Discount</label>
                <div className="flex items-center py-2 w-full bg-gray-200 px-3">
                  <input
                    value={discountValue}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setDiscountValue(e.target.value);
                      }
                    }}
                    type="text"
                    placeholder="Enter Price"
                    className=" flex-1 bg-gray-200 outline-none rounded-lg"
                  />
                  <PiCurrencyInrBold size={20} className=" text-gray-400" />
                </div>
                {validationError && discountValue === "" && (
                  <p className=" absolute -bottom-1 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col h-[200px] overflow-hidden gap-3 px-1 pb-6">
                <label>Features</label>
                <div className="flex items-center relative  w-full gap-4">
                  <input
                    value={featurevalue}
                    onChange={(e) => {
                      setaddFeatureError(false);
                      setFeaturevalue(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Feature"
                    className=" flex-1 bg-gray-200 outline-none rounded-md py-2 px-3"
                  />
                  {addFeatureError && (
                    <p className="absolute text-red-500 text-[12px] left-1 top-[100%]">
                      Required
                    </p>
                  )}
                  <button
                    onClick={() => AddFeature(featurevalue)}
                    className=" bg-blue py-2 px-4 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="w-full h-full overflow-auto flex flex-col gap-3 mt-1">
                  {features.length > 0 &&
                    features.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center py-1 w-full gap-2"
                        >
                          <p className="w-[89%] break-words rounded-md bg-gray-200 py-2 px-3 text-[16px]">
                            {item}
                          </p>
                          <div onClick={() => RemoveFeature(index)}>
                            <MdDelete
                              size={30}
                              className="text-[#5e5454] flex items-center justify-center cursor-pointer hover:text-red-500 transition-all duration-200"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-end mt-4">
              {submitLoader ? (
                <button className=" bg-blue text-white w-[150px] py-2 rounded-lg text-[16px] font-semibold">
                  <ClipLoader size={20} color="#fff" />
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className=" bg-blue text-white w-[150px] py-2 rounded-lg text-[16px] font-semibold"
                >
                  Create Plan
                </button>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid gap-3 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 mobile:grid-cols-1 xss:grid-cols-1">
              <div className=" relative flex flex-col gap-3 px-1 pb-6">
                <label>Select Plan</label>
                <div className="flex items-center gap-2 flex-1">
                  <p className="bg-gray-300 w-full py-2 rounded-md px-3">
                    {selectPlanName.label}
                  </p>

                  {validationError && !selectPlanName && (
                    <p className=" absolute bottom-0 text-red-500">Required</p>
                  )}
                </div>
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Duration</label>
                <Select
                  options={Options}
                  styles={style}
                  placeholder="Select Duration"
                  SelectedValue={setselectedDuration}
                  value={selectedDuration}
                  clear={true}
                />
                {validationError && !selectedDuration && (
                  <p className=" absolute bottom-0 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Duration No</label>
                <Select
                  options={DurationNumber}
                  styles={style}
                  placeholder="Select Duration"
                  SelectedValue={setSelectedDurationNumber}
                  value={selectedDurationNumber}
                  clear={true}
                />
                {validationError && !selectedDurationNumber && (
                  <p className=" absolute bottom-0 text-red-500">Required</p>
                )}
              </div>

              <div className=" relative flex flex-col gap-3 px-1 pb-6">
                <label>Price</label>
                <div className="flex items-center py-2 w-full bg-gray-200 px-3">
                  <input
                    value={pricevalue}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setPricevalue(e.target.value);
                      }
                    }}
                    type="text"
                    placeholder="Enter Price"
                    className=" flex-1 bg-gray-200 outline-none rounded-lg"
                  />
                  <PiCurrencyInrBold size={20} className=" text-gray-400" />
                </div>
                {validationError && pricevalue === "" && (
                  <p className=" absolute -bottom-1 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col gap-3 px-1 pb-6">
                <label>Discount</label>
                <div className="flex items-center py-2 w-full bg-gray-200 px-3">
                  <input
                    value={discountValue}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setDiscountValue(e.target.value);
                      }
                    }}
                    type="text"
                    placeholder="Enter Price"
                    className=" flex-1 bg-gray-200 outline-none rounded-lg"
                  />
                  <PiCurrencyInrBold size={20} className=" text-gray-400" />
                </div>
                {validationError && discountValue === "" && (
                  <p className=" absolute -bottom-1 text-red-500">Required</p>
                )}
              </div>

              <div className="relative flex flex-col h-[315px] overflow-hidden gap-3 px-1 pb-6">
                <label>Features</label>
                <div className="flex items-center relative  w-full gap-4">
                  <input
                    value={featurevalue}
                    onChange={(e) => {
                      setaddFeatureError(false);
                      setFeaturevalue(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Feature"
                    className=" flex-1 bg-gray-200 outline-none rounded-md py-2 px-3"
                  />
                  {addFeatureError && (
                    <p className="absolute text-red-500 text-[12px] left-1 top-[100%]">
                      Required
                    </p>
                  )}
                  <button
                    onClick={() => AddFeature(featurevalue)}
                    className=" bg-blue py-2 px-4 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="w-full h-full overflow-auto flex flex-col gap-3 mt-1">
                  {features?.length > 0 &&
                    features?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center py-1 w-full gap-2"
                        >
                          <p className="w-[89%] break-words rounded-md bg-gray-200 py-2 px-3 text-[16px]">
                            {item || ""}
                          </p>
                          <div onClick={() => RemoveFeature(index)}>
                            <MdDelete
                              size={30}
                              className="text-[#5e5454] flex items-center justify-center cursor-pointer hover:text-red-500 transition-all duration-200"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-end mt-4">
              {submitLoader ? (
                <button className=" bg-blue text-white w-[150px] py-2 rounded-lg text-[16px] font-semibold">
                  <ClipLoader size={20} color="#fff" />
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className=" bg-blue text-white w-[150px] py-2 rounded-lg text-[16px] font-semibold"
                >
                  Update Plan
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <ModelResponsive
        modalpopup={model}
        openModal={setmodel}
        trigger={handleDelete}
        loader={submitLoader}
        details={details}
      />
    </div>
  );
};

export default Subscription;
