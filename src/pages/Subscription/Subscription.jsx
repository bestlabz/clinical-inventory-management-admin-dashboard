import React from "react";

import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { PiCurrencyInrBold } from "react-icons/pi";

import SubscriptionFunction from "../../hooks/Subscription/Subscription";
import Select from "../../Components/Properites/Select/Select";

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
  } = SubscriptionFunction();

  const { subscriptionNames } = useSelector((state) => state.subscription);

  return (
    <div className="container px-1">
      <div className="table-box ">
        <h1 className="text-[22px] font-semibold pb-6">
          Subscription Plan Template Create
        </h1>

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
        </div>

        <div className="w-full flex items-center justify-end">
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
      </div>
    </div>
  );
};

export default Subscription;
