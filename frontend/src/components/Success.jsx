import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { CircleCheckBig } from "lucide-react";

const Success = () => {
  const [params] = useSearchParams();

  const sessionId = params.get("session_id");
  const _id = params.get("_id");

  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const { userToken, getAppointments } = useAppContext();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/user/verify-session?session_id=${sessionId}&&_id=${_id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (data.success) {
          setVerified(true);
          getAppointments();
        } else {
          toast.error("Invalid payment session.");
          navigate("/");
        }
      } catch (err) {
        toast.error("Error verifying payment.");
        navigate("/");
      }
    };

    if (sessionId) {
      verifySession();
    } else {
      navigate("/");
    }
  }, [sessionId, navigate]);

  if (!verified) return <p>Verifying payment...</p>;

  return (
    <div className="py-18 flex items-center justify-center bg-gradient-to-br  px-4">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CircleCheckBig className="size-20 text-green-500 " />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-base md:text-xl mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <button
          onClick={() => navigate("/my-appointments")}
          className="bg-primary text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          Go to My Appointments
        </button>
      </div>
    </div>
  );
};

export default Success;
