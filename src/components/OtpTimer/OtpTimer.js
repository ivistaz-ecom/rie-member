import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import emailjs from "emailjs-com";

function Timer() {
  const sendOtp = () => {
    const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
    const parseMemInfo = JSON.parse(memberInfo);
    const email = parseMemInfo[0].email;
    const firstName = parseMemInfo[0].firstname;
    const lastName = parseMemInfo[0].lastname;

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("verification", generatedOtp);
    const templateParams = {
      to_email: email,
      subject: "RIE 2025 Event Ticket",
      code: generatedOtp,
      name: firstName + " " + lastName,
    };

    emailjs
      .send(
        "default_service",
        "template_81ng8dr",
        templateParams,
        "hsxWBIOu96PDlE41t",
      )
      .then(
        () => {
          console.log("OTP sent successfully!");
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send email.");
        },
      );
  };

  const [seconds, setSeconds] = useState(() => {
    const storedSeconds = sessionStorage.getItem("timerSeconds");
    return storedSeconds ? parseInt(storedSeconds, 10) : 30;
  });
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        clearInterval(intervalId);
        setTimerFinished(true);
        sessionStorage.removeItem("timerSeconds");
        console.log("Timer reached 0");
      } else {
        setSeconds((prevSeconds) => {
          const updatedSeconds = prevSeconds - 1;
          sessionStorage.setItem("timerSeconds", updatedSeconds);
          return updatedSeconds;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const resetTimer = () => {
    sendOtp(); // Optionally resend OTP when timer is reset
    setSeconds(30);
    setTimerFinished(false);
    sessionStorage.setItem("timerSeconds", 30);
  };

  return (
    <div>
      {timerFinished ? (
        <Button type="submit" size="lg" onClick={resetTimer}>
          Resend OTP
        </Button>
      ) : (
        <Button size="lg" className="" disabled={true}>
          Resend OTP {seconds} sec
        </Button>
      )}
    </div>
  );
}

export default Timer;
