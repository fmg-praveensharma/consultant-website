// components/EditProfile.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  useGetConsultantDetailQuery,
  useUpdateConsultantDetailsMutation,
} from "@/store/services";

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    currently_employed: "",
    address: "",
    country: "",
    highest_qualification: "",
    degree_diploma: "",
    college_school_university: "",
    from_where_did_you_learn_flute: "",
    gender: "",
    marital_status: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  });

  const [errors, setErrors] = useState({
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  });

  const { data: fetchData, error, isLoading } = useGetConsultantDetailQuery();
  const [updateConsultantDetails, { isLoading: isUpdating }] =
    useUpdateConsultantDetailsMutation();

  useEffect(() => {
    // console.log("consultant data", fetchData);
    if (fetchData) {
      const profile_photo = fetchData?.data?.photos.find(
        (photo) => photo.photo_type === 1
      );

      setFormData({
        ...formData,
        first_name: fetchData?.data?.first_name || "",
        last_name: fetchData?.data?.last_name || "",
        phoneNumber: fetchData?.data?.phoneNumber || "",
        country_code: fetchData?.data?.country_code || "",

        photo: profile_photo?.url || null,
        date_of_birth: fetchData?.data?.date_of_birth || "",
        email: fetchData?.data?.email || "",
        currently_employed: fetchData?.data?.currently_employed ? "Yes" : "No",
        address: fetchData?.data?.address || "",
        country: fetchData?.data?.country || "",
        highest_qualification: fetchData?.data?.highest_qualification || "",
        degree_diploma: fetchData?.data?.degree_diploma || "",
        college_school_university:
          fetchData?.data?.college_school_university || "",
        from_where_did_you_learn_flute:
          fetchData?.data?.from_where_did_you_learn_flute || "",
        gender:
          fetchData?.data?.gender === 1
            ? "Male"
            : fetchData?.data?.gender === 2
            ? "Female"
            : "Other",
        marital_status:
          fetchData?.data?.marital_status === 1
            ? "Single"
            : fetchData?.data?.marital_status === 2
            ? "Married"
            : "Other",
        instagram: fetchData?.data?.social_media?.instagram || "",
        facebook: fetchData?.data?.social_media?.facebook || "",
        linkedin: fetchData?.data?.social_media?.linkedin || "",
        youtube: fetchData?.data?.social_media?.youtube || "",
        x: fetchData?.data?.social_media?.x || "",
      });
    }
  }, [fetchData]);

  const validateUrl = (url: string) => {
    // Regex to match https:// followed by at least one letter
    const urlPattern = /^https:\/\/[a-zA-Z]/;
    return urlPattern.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate URL for social media fields
    if (["instagram", "facebook", "linkedin", "youtube", "x"].includes(name)) {
      if (!validateUrl(value)) {
        setErrors({
          ...errors,
          [name]: '  Must start with "https://" followed by a letter.',
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Ensure there are no validation errors before submitting
    // if (Object.values(errors).some((error) => error)) {
    //   console.error("Please correct the errors before submitting.");
    //   return;
    // }

    try {
      // Convert formData to payload format
      const genderEnum =
        formData.gender === "Male" ? 1 : formData.gender === "Female" ? 2 : 3;
      const maritalStatusEnum =
        formData.marital_status === "Single"
          ? 1
          : formData.marital_status === "Married"
          ? 2
          : formData.marital_status === "Divorced"
          ? 3
          : formData.marital_status === "Widowed"
          ? 4
          : 5;

      // Construct the payload with recognized fields
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        email: formData.email,
        address: formData.address,
        highest_qualification: formData.highest_qualification,
        degree_diploma: formData.degree_diploma,
        college_school_university: formData.college_school_university,
        gender: genderEnum,
        marital_status: maritalStatusEnum,
        social_media: {
          ...(formData.instagram && { instagram: formData.instagram }),
          ...(formData.facebook && { facebook: formData.facebook }),
          ...(formData.linkedin && { linkedin: formData.linkedin }),
          ...(formData.youtube && { youtube: formData.youtube }),
          ...(formData.x && { x: formData.x }),
        },
      };

      // Submit the form data to the API
      const result = await updateConsultantDetails(payload).unwrap();
      console.log("Update success", result);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Edit Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={formData.photo}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {formData.first_name} {formData.last_name}
            </h3>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-gray-600">
              {formData.country_code}-{formData.phoneNumber}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Basic Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  First Name :
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Last Name :
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Date of Birth :
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  placeholder="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">Gender :</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Current Address:
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Current Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">Country :</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  readOnly
                  disabled
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Marital Status :
                </label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                >
                  <option>Marital Status</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Education Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Highest qualification :
                </label>
                <input
                  type="text"
                  name="highest_qualification"
                  placeholder="Select your highest qualification"
                  value={formData.highest_qualification}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  Degree/Diploma :
                </label>
                <input
                  type="text"
                  name="degree_diploma"
                  placeholder="Degree/Diploma"
                  value={formData.degree_diploma}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[17px] font-[400] mb-1">
                  College/School/University :
                </label>
                <input
                  type="text"
                  name="college_school_university"
                  placeholder="College/School/University"
                  value={formData.college_school_university}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Social Details:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram profile link"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instagram}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook profile link"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
                {errors.facebook && (
                  <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn profile link"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
                {errors.linkedin && (
                  <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="youtube"
                  placeholder="YouTube Channel link"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
                {errors.youtube && (
                  <p className="text-red-500 text-sm mt-1">{errors.youtube}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="x"
                  placeholder="Website profile link"
                  value={formData.x}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
                {errors.x && (
                  <p className="text-red-500 text-sm mt-1">{errors.x}</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isUpdating ? "Submiting ..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
