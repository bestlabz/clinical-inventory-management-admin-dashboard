import React, { useEffect, useState } from "react";
import ModelPopup from "../../Components/Properites/ModelPopup/ModelPopup";
import { IoClose } from "react-icons/io5";

//Translate
import { ClipLoader } from "react-spinners";

const ModelResponsive = ({
  modalpopup,
  openModal,
  trigger,
  details,
  loader = false,
}) => {




  return (
        <>
          <div className=" 2xl:block xl:block lg:hidden md:hidden sm:hidden xs:hidden mobile:hidden xss:hidden">
            <ModelPopup showDrawer={modalpopup} width="30%" height="20%">
              <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="absolute top-2 right-3">
                  <IoClose
                    onClick={() => openModal(false)}
                    size={20}
                    className="font-bold cursor-pointer hover:text-red-500 transition-all duration-300"
                  />{" "}
                </div>
                <p className="text-[22px] font-semibold text-center w-[80%]">
                Are you sure you want to Delete ?
                </p>               

                <div className="flex items-center w-[80%] justify-center gap-4">
                  <button
                    className="logout-button bg-red-500 text-white text-[18px] hover:bg-transparent hover:text-red-500 transition-all duration-300 hover:border-red-500"
                    onClick={() => openModal(false)}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <button className="logout-button text-[18px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300">
                      <ClipLoader size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (trigger) {
                            return trigger(details);
                        }
                      }}
                      className="logout-button text-[18px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300"
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </ModelPopup>
          </div>

          <div className=" 2xl:hidden xl:hidden lg:block md:hidden sm:hidden xs:hidden mobile:hidden xss:hidden">
            <ModelPopup showDrawer={modalpopup} width="40%" height="30%">
            <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="absolute top-2 right-3">
                  <IoClose
                    onClick={() => openModal(false)}
                    size={20}
                    className="font-bold cursor-pointer hover:text-red-500 transition-all duration-300"
                  />{" "}
                </div>
                <p className="text-[18px] font-semibold text-center w-[80%]">
                Are you sure you want to Delete ?
                </p>               

                <div className="flex items-center w-[80%] justify-center gap-4">
                  <button
                    className="logout-button bg-red-500 text-white text-[16px] hover:bg-transparent hover:text-red-500 transition-all duration-300 hover:border-red-500"
                    onClick={() => openModal(false)}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <button className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300">
                      <ClipLoader size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (trigger) {
                            return trigger(details);
                        }
                      }}
                      className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300"
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </ModelPopup>
          </div>

          <div className=" 2xl:hidden xl:hidden lg:hidden md:block sm:block xs:hidden mobile:hidden xss:hidden">
            <ModelPopup showDrawer={modalpopup} width="50%" height="30%">
            <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="absolute top-2 right-3">
                  <IoClose
                    onClick={() => openModal(false)}
                    size={20}
                    className="font-bold cursor-pointer hover:text-red-500 transition-all duration-300"
                  />{" "}
                </div>
                <p className="text-[18px] font-semibold text-center w-[80%]">
                Are you sure you want to Delete ?
                </p>               

                <div className="flex items-center w-[80%] justify-center gap-4">
                  <button
                    className="logout-button bg-red-500 text-white text-[16px] hover:bg-transparent hover:text-red-500 transition-all duration-300 hover:border-red-500"
                    onClick={() => openModal(false)}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <button className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300">
                      <ClipLoader size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (trigger) {
                            return trigger(details);
                        }
                      }}
                      className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300"
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </ModelPopup>
          </div>

          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:block mobile:block xss:hidden">
            <ModelPopup showDrawer={modalpopup} width="90%" height="30%">
            <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="absolute top-2 right-3">
                  <IoClose
                    onClick={() => openModal(false)}
                    size={20}
                    className="font-bold cursor-pointer hover:text-red-500 transition-all duration-300"
                  />{" "}
                </div>
                <p className="text-[18px] font-semibold text-center w-[80%]">
                Are you sure you want to Delete ?
                </p>               

                <div className="flex items-center w-[80%] justify-center gap-4">
                  <button
                    className="logout-button bg-red-500 text-white text-[16px] hover:bg-transparent hover:text-red-500 transition-all duration-300 hover:border-red-500"
                    onClick={() => openModal(false)}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <button className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300">
                      <ClipLoader size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (trigger) {
                            return trigger(details);
                        }
                      }}
                      className="logout-button text-[16px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300"
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </ModelPopup>
          </div>

          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:hidden mobile:hidden xss:block">
            <ModelPopup showDrawer={modalpopup} width="96%" height="30%">
            <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="absolute top-2 right-3">
                  <IoClose
                    onClick={() => openModal(false)}
                    size={20}
                    className="font-bold cursor-pointer hover:text-red-500 transition-all duration-300"
                  />{" "}
                </div>
                <p className="text-[16px] font-semibold text-center w-[80%]">
                Are you sure you want to Delete ?
                </p>               

                <div className="flex items-center w-[80%] justify-center gap-4">
                  <button
                    className="logout-button bg-red-500 text-white text-[14px] hover:bg-transparent hover:text-red-500 transition-all duration-300 hover:border-red-500"
                    onClick={() => openModal(false)}
                  >
                    Cancel
                  </button>
                  {loader ? (
                    <button className="logout-button text-[14px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300">
                      <ClipLoader size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (trigger) {
                            return trigger(details);
                        }
                      }}
                      className="logout-button text-[14px] border-secondary_text hover:bg-primary_color hover:text-white hover:border-primary_color transition-all duration-300"
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </ModelPopup>
          </div>
        </>
  );
};

export default ModelResponsive;
