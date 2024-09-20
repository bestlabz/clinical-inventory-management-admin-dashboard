import React from "react";

import Logo from "../../assets/Logo.png";

//Translate
import Translate from "../../Components/translateSpan/TranslateSpan";
import TranslateJson from "../../utils/translation/en.json";

import Cliploader from "react-spinners/CircleLoader";

//Components
import Input from "../../Components/Properites/Inputs/Input";
import OTP from "../../Components/Properites/OTP/OtpBox";

//Hooks
import LoginFunction from "../../hooks/Authentication/Login";
import CountDown from "../../hooks/Authentication/CountDown";
import { useSelector } from "react-redux";

const Login = () => {
  const {
    step,
    handelClickOTP,
    error,
    errors,
    handleChange,
    handleSubmit,
    values,
    navigateSignup,
    handelChange,
    loader,
  } = LoginFunction();
  const { count, formatTime, setTime } = CountDown();

  const { otpValue, Err } = useSelector((state) => state.otpValue);

  return (
    <div className="public-route">
      <div className="public-route-right">
        <div className="public-route-right-inside"></div>
      </div>
      <div className="public-route-left">
        <div className="public-route-left-inside">
          <div className="title-text 2xl:hidden xl:hidden lg:hidden block">
            <img src={Logo} className="object-contain w-[200px]" />
          </div>
          <h1 className="title-text">{TranslateJson.Login.title}</h1>
          {step === 1 && (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="login-form"
            >
              <Input
                id="phone_number"
                name="phone_number"
                label={TranslateJson.Login.label}
                placeholder={TranslateJson.Login.placeholder}
                value={values.phone_number}
                setValue={(e) => {
                  if (!/^\d*$/.test(e.target.value)) {
                    return; // If not a digit, return without updating the state
                  } else {
                    handleChange(e);
                  }
                }}
                err={errors.phone_number}
                length={10}
              />
              {loader ? (
                <button type="button" className="login-button">
                  <Cliploader size={20} color="#fff" />
                </button>
              ) : (
                <button type="submit" className="login-button">
                  {TranslateJson.Login.button}
                </button>
              )}
            </form>
          )}
          {step === 2 && (
            <>
              <div className="flex flex-col ">
                {/* lg:w-[55%] xl:w-[70%] 2xl:w-[85%] md:w-[55%] gap-3 sm:w-[55%] xs:w-[90%] xss:w-[90%] mobile:w-[95%] */}
                <div className=" 2xl:block xl:block lg:block md:block sm:block xs:hidden mobile:hidden xss:hidden">
                  <OTP err={Err} />
                </div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:block mobile:hidden xss:hidden">
                  <OTP err={Err} gap="6px" height="45px" width="45px" />
                </div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:hidden mobile:block xss:hidden">
                  <OTP
                    err={Err}
                    gap="6px"
                    height="35px"
                    width="35px"
                    fontSize="24px"
                  />
                </div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:hidden mobile:hidden xss:block">
                  <OTP
                    err={Err}
                    gap="3px"
                    height="33px"
                    width="33px"
                    fontSize="18px"
                  />
                </div>
              </div>

              <p className="resend-text">
                <span
                  onClick={setTime}
                  className=" text-primary_color cursor-pointer"
                >
                  {TranslateJson.verification["resend-text"]}
                </span>
                {formatTime(count)}
              </p>
              {loader ? (
                <div className="login-button-otp">
                  <button type="button">
                    <Cliploader size={20} color="#fff" />
                  </button>
                </div>
              ) : (
                <div className="login-button-otp" onClick={handelClickOTP}>
                  <button>{TranslateJson.verification.button}</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
