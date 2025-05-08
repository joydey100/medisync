import React, { useEffect, useRef, useState } from "react";
import { Pencil, Trash, Loader } from "lucide-react";
import avatar from "../assets/upload_area.png";
import { useAppContext } from "../context/AppContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, userToken, getUserData } = useAppContext();

  const [imageSrc, setImageSrc] = useState(userData?.image);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();
  const [phone, setPhone] = useState(userData?.phone || "");

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
    setImageFile(file);
  };

  const handleDelete = async () => {
    setDelLoading(true);
    setImageSrc("");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete-image`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      await getUserData();
      setDelLoading(false);
      toast.success("Image removed successfully");
    } catch (error) {
      setDelLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEdit) return;
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("fullName", userData.fullName);
      formData.append("phone", userData.phone || phone || "");
      imageFile && formData.append("image", imageFile);
      formData.append("gender", userData.gender || "");
      formData.append("age", userData.age || "");
      formData.append("bloodGroup", userData.bloodGroup || "");
      formData.append("weight", userData.weight || "");
      formData.append(
        "feet",
        userData?.height?.feet ? parseInt(userData?.height?.feet) : ""
      );
      formData.append(
        "inches",
        userData?.height?.inches ? parseInt(userData?.height?.inches) : ""
      );

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData();
        setIsEdit(false);
        setImageFile(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  console.log(imageSrc, userData?.image);

  return (
    userData && (
      <section className="my-16">
        <div className="info-box mx-auto max-w-3xl p-10 shadow-2xl">
          <h2 className="my-4 text-3xl font-bold text-center text-primary/80">
            My Profile
          </h2>
          <form onSubmit={updateProfile}>
            <div className="relative image-box flex items-center justify-center size-40 mx-auto ">
              <img
                src={imageSrc || userData.image || avatar}
                alt={userData.fullName || "Profile"}
                className="my-4 w-full  rounded-full object-cover ring-4 ring-primary/80"
              />

              {/* Edit (Pencil) Icon */}

              {isEdit && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-primary/70 p-2 rounded-full shadow cursor-pointer"
                  title="Edit Image"
                  type="button"
                >
                  <Pencil className="h-5 w-5 text-white" />
                </button>
              )}

              {/* Delete (X) Icon */}

              {isEdit && (
                <button
                  onClick={handleDelete}
                  className={`absolute top-0 right-0 bg-red-100 p-2 rounded-full shadow cursor-pointer ${!imageSrc && "hidden"} `}
                  title="Remove Image"
                  type="button"
                >
                  {delLoading ? (
                    <Loader className="h-5 w-5 text-red-500 animate-spin" />
                  ) : (
                    <Trash className="h-5 w-5 text-red-500" />
                  )}
                </button>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-bold mt-8 text-primary/80">
              {" "}
              Contact information
            </h2>
            <div className="name my-4">
              <label htmlFor="name">Name: </label> <br />
              {isEdit ? (
                <input
                  type="text"
                  id="name"
                  className="border p-2 mt-2 w-full"
                  placeholder="Type your name"
                  value={userData.fullName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
              ) : (
                <p className="p-2 mt-2 w-full bg-slate-100 rounded">
                  {userData?.fullName}
                </p>
              )}
            </div>
            <div className="email my-4">
              <label htmlFor="email">Email: </label> <br />
              {isEdit ? (
                <input
                  type="email"
                  id="email"
                  className="border p-2 mt-2 w-full"
                  placeholder="Type your name"
                  value={userData.email || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled
                />
              ) : (
                <p className="p-2 mt-2 w-full bg-slate-100 rounded">
                  {" "}
                  {userData?.email}
                </p>
              )}
            </div>
            <div className="mobile-number my-4">
              <p>Mobile Number: </p>
              {isEdit ? (
                <PhoneInput
                  defaultCountry="BD"
                  type="text"
                  name="phone"
                  className="border p-2 mt-2 w-full"
                  placeholder="Type your mobile number"
                  value={userData.phone || phone || ""}
                  onChange={setPhone}
                />
              ) : (
                <p
                  className={`p-2 mt-2 w-full  rounded ${
                    userData.phone || phone ? "bg-slate-100" : "bg-red-200"
                  }`}
                >
                  {userData?.phone || phone || "Please add your mobile number"}
                </p>
              )}
            </div>
            <h2 className="text-2xl font-bold mt-8 text-primary/80">
              Basic information
            </h2>
            <div className="gender my-4">
              <label htmlFor="gender">Gender: </label> <br />
              {isEdit ? (
                <select
                  id="gender"
                  value={userData.gender ?? ""}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  className="border p-2 mt-2 w-full"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p
                  className={`p-2 mt-2 w-full capitalize   rounded ${
                    userData?.gender ? "bg-slate-100" : "bg-red-200"
                  }`}
                >
                  {userData?.gender || "Select your gender"}
                </p>
              )}
            </div>

            <div className="age my-4">
              <label htmlFor="age">Age: </label> <br />
              {isEdit ? (
                <input
                  type="number"
                  id="age"
                  max={100}
                  className="border p-2 mt-2 w-full"
                  placeholder="Type your age"
                  value={userData.age || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, age: e.target.value })
                  }
                />
              ) : (
                <p
                  className={`p-2 mt-2 w-full   rounded ${
                    userData?.age ? "bg-slate-100" : "bg-red-200"
                  }`}
                >
                  {userData?.age || "Type your age"}
                </p>
              )}
            </div>
            <div className="blood-group my-4">
              <label htmlFor="bloodGroup">Blood Group: </label> <br />
              {isEdit ? (
                <select
                  id="bloodGroup"
                  value={userData?.bloodGroup ?? ""}
                  onChange={(e) =>
                    setUserData({ ...userData, bloodGroup: e.target.value })
                  }
                  className="border p-2 mt-2 w-full"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p
                  className={`p-2 mt-2 w-full   rounded ${
                    userData?.bloodGroup ? "bg-slate-100" : "bg-red-200"
                  }`}
                >
                  {userData?.bloodGroup || "Add your blood group"}
                </p>
              )}
            </div>

            <div className="height my-4">
              <p>Height: </p>
              {isEdit ? (
                <div className="flex gap-2 mt-2">
                  <select
                    value={userData?.height?.feet ?? ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        height: { ...userData.height, feet: e.target.value },
                      })
                    }
                    className="border p-2 basis-[50%]"
                  >
                    <option value="">Feet</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} ft
                      </option>
                    ))}
                  </select>
                  <select
                    value={userData?.height?.inches ?? ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        height: { ...userData.height, inches: e.target.value },
                      })
                    }
                    className="border p-2 basis-[50%]"
                  >
                    <option value="">Inches</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i}>
                        {i} in
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p
                  className={`p-2 mt-2 w-full  rounded ${
                    userData?.height?.feet || userData?.height?.inches
                      ? "bg-slate-100"
                      : "bg-red-200"
                  }`}
                >
                  {userData?.height?.feet && userData?.height?.inches
                    ? `${userData?.height?.feet} ft ${userData?.height?.inches} in`
                    : (userData?.height?.feet &&
                        `${userData?.height?.feet} ft`) ||
                      (userData?.height?.inches &&
                        `${userData?.height?.inches} in`) ||
                      "Add your height"}
                </p>
              )}
            </div>
            <div className="weight my-4">
              <label htmlFor="weight">Weight: </label> <br />
              {isEdit ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    id="weight"
                    value={userData?.weight || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, weight: e.target.value })
                    }
                    className="border p-2 w-full"
                    placeholder="Enter weight"
                    min="0"
                  />
                  <span className="text-gray-600">kg</span>
                </div>
              ) : (
                <p
                  className={`p-2 mt-2 w-full  rounded ${
                    userData?.weight ? "bg-slate-100" : "bg-red-200"
                  }`}
                >
                  {userData?.weight || "Add your weight"}
                </p>
              )}
            </div>

            {isEdit && (
              <button
                type="submit"
                className="py-4 font-medium text-base bg-primary text-white cursor-pointer w-full mt-4 flex items-center gap-2 justify-center"
              >
                <span>Save</span>
                {loading && <Loader className="animate-spin" />}
              </button>
            )}

            {!isEdit && (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className=" py-4 font-medium text-base bg-primary text-white cursor-pointer w-full mt-4"
              >
                Edit
              </button>
            )}
          </form>
        </div>
      </section>
    )
  );
};

export default MyProfile;
