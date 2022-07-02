import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import accountService from "services/account";

const VerificationPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const navigator = useNavigate()

  const tick = () => {
    if (timeLeft <= 0) {
      navigator("/login");
    }
    setTimeLeft(timeLeft - 1);
  };

  const fetchData = async () => {
    setLoading(true);

    const response = await accountService.verify(token);
    const { exitcode } = response.data;
    if (exitcode === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }

    setLoading(false);
    setTimeLeft(3);
  };

  useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column align-items-center p-5">
      {loading ? (
        <h2 className="p-5">Your account is being verified...</h2>
      ) : (
        <>
          {success ? (
            <h2>Verify account successfully</h2>
          ) : (
            <h2>Verify account failed</h2>
          )}
          <h3>You will be redirect in... {timeLeft} second(s)</h3>
        </>
      )}
    </div>
  );
};

export default VerificationPage;
