import React from "react";

//Translate
import Translate from "../../Components/translateSpan/TranslateSpan";
import TranslateJson from "../../utils/translation/en.json";

import Cliploader from "react-spinners/CircleLoader";

//Components
import Input from "../../Components/Properites/Inputs/Input";
import OTPResponsive from "../../Components/Properites/OTP/OTPResponsive";

//Hooks
import LoginFunction from "../../hooks/Authentication/Login";
import CountDown from "../../hooks/Authentication/CountDown";

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
    otpValue,
    loader,
  } = LoginFunction();
  const { count, formatTime, setTime } = CountDown();

  return (
    <div className="public-route">
      <div className="public-route-right">
        <div className="public-route-right-inside"></div>
      </div>
      <div className="public-route-left">
        <div className="public-route-left-inside">
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
              <OTPResponsive
                error={error}
                handelChange={(e) => handelChange({ e })}
                length={6}
                otpValue={otpValue}
              />

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
                <button type="button" className="login-button">
                  <Cliploader size={20} color="#fff" />
                </button>
              ) : (
                <button className="login-button-otp" onClick={handelClickOTP}>
                  {TranslateJson.verification.button}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
