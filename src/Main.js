import { useState } from "react";
import "./App.css";
import { auth } from "./firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import Home from "./componenets/Home";

function Main() {
  const [value, setValue] = useState();
  const [otp, setOtp] = useState(true);
  const [OTP, setOTP] = useState();
  const [user, setUser] = useState("");
  // console.log(user.phoneNumber, "f");
  function onCaptchaVerified() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignInSubmit();
          },
        },
        auth
      );
    }
  }
  function onSignInSubmit() {
    onCaptchaVerified();
    const phoneNumberr = "+" + value;
    const appVerifier = window.recaptchaVerifier;

    console.log(auth, "jm", appVerifier, phoneNumberr, otp);
    signInWithPhoneNumber(auth, phoneNumberr, appVerifier)
      .then((confirmationResult) => {
        setOtp(false);
        window.confirmationResult = confirmationResult;
        setOtp(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function otpVerify() {
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        setUser(res.user);
        console.log(res.phoneNumber);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        // backgroundColor: "Highlight",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="recaptcha-container"></div>

      {!user ? (
        <>
          {otp ? (
            <div>
              <h1>Enter Phone Number</h1>
              <div>
                <PhoneInput
                  placeholder="Enter phone number"
                  country={"in"}
                  value={value}
                  onChange={setValue}
                />
              </div>
              <button
                style={{
                  padding: " 10px 20px",
                  backgroundColor: "ButtonShadow",
                  borderRadius: "20px",
                  marginTop: "30px",
                }}
                onClick={onSignInSubmit}
              >
                send OTP
              </button>
            </div>
          ) : (
            <div>
              <h1>Enter OTP Recieved</h1>
              <div>
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  secure
                />
                <ResendOTP
                  onResendClick={() => console.log("Resend clicked")}
                />
              </div>
              <button
                style={{
                  padding: " 10px 20px",
                  backgroundColor: "ButtonShadow",
                  borderRadius: "20px",
                  marginTop: "30px",
                }}
                onClick={otpVerify}
              >
                verify OTP
              </button>
            </div>
          )}
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default Main;
