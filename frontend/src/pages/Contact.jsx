import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-center mb-8">Contact Us</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="left-side col-span-12 md:col-span-6 flex justify-end">
          <img
            src={assets.contact_image}
            alt="contact_image"
            className="w-full md:max-w-[360px]"
          />
        </div>
        <div className="right-side col-span-12 md:col-span-6 p-4 flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-4"> Our Office</h4>
          <p className="text-base text-gray-600 mb-2"> 00000 Willms Station</p>
          <p className="text-base text-gray-600 mb-2">
            {" "}
            Suite 000, Washington, USA
          </p>
          <p className="text-base text-gray-600 mb-2"> Tel: (000) 000-0000</p>
          <p className="text-base text-gray-600 mb-2">
            Email: greatstackdev@gmail.com{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
