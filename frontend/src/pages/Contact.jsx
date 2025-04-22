import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>
      <div className="flex gap-4">
        <div className="left-side">
          <img src={assets.contact_image} alt="contact_image" />
        </div>
        <div className="right-side">
          <h4> Our Office</h4>
          <p> 00000 Willms Station</p>
          <p> Suite 000, Washington, USA</p>
          <p> Tel: (000) 000-0000</p>
          <p>Email: greatstackdev@gmail.com </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
