import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="py-18 n flex items-center justify-center bg-gradient-to-br  px-4">
      <div className="bg-white shadow-2xl  rounded-3xl p-10 max-w-lg w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CircleX className="size-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your transaction was not completed. You can try again or contact
          support if needed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          Go to Home page
        </button>
      </div>
    </div>
  );
};

export default Cancel;
