"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  useUpdateConsultantProfilePicMutation,
  
} from "@/store/services";

export type PhotoStatus = "pending" | "approved" | "rejected";

interface PhotoCardProps {
  id: number;
  status: string;
  src: string;
  onDelete: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ id, status, src, onDelete }) => {
  const [isProfilePicRequested, setProfilePicRequested] = useState(false);
  const [setProfilePic, { isLoading, error }] =
    useUpdateConsultantProfilePicMutation();

 

  const handleProfilePicRequest = async () => {
    console.log("handleProfilePicRequest called");
    setProfilePicRequested((prev) => !prev);

    try {
      const response = await setProfilePic({
        id,
        body: {
          profile_pic_request: 1,
        },
      }).unwrap();

      console.log("Profile picture update request sent successfully", response);
    } catch (error) {
      console.error("Failed to set profile picture", error);
      setProfilePicRequested((prev) => !prev);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md max-w-xs">
      <div className="relative">
        <img
          src={src}
          alt="Photo"
          className="w-full h-[400px] object-cover mb-4 rounded-t-lg"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm ${
            status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : status === "approved"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        <button
          onClick={onDelete}
          className="absolute bottom-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <Trash2 className="w-7 h-7 p-1 text-black" />
        </button>
      </div>
      {status === "pending" && (
        <p className="mt-4 text-red-600 text-center">
          Your photo is being reviewed by our team. Please wait a few minutes.
        </p>
      )}
      {status === "approved" && (
        <div className="my-4 text-center">
          {isProfilePicRequested ? (
            <>
              <p className="text-red-600">Requested for Approval</p>
              <button
                onClick={handleProfilePicRequest}
                disabled={isLoading}
                className={`mt-2 px-4 py-2 ${
                  isLoading ? "bg-gray-400" : "bg-[#BF0101] hover:bg-[#BF0101]"
                } text-white rounded-lg`}
              >
                {isLoading ? "Cancelling..." : "Cancel Profile Pic Request"}
              </button>
            </>
          ) : (
            <button
              onClick={handleProfilePicRequest}
              disabled={isLoading}
              className={`mt-2 px-4 py-2 ${
                isLoading ? "bg-gray-400" : "bg-[#051D41] hover:bg-[#051D41]"
              } text-white rounded-lg`}
            >
              {isLoading ? "Requesting..." : "Request for Profile Picture"}
            </button>
          )}
        </div>
      )}
      {status === "rejected" && (
        <p className="mt-4 text-[#BF0101] text-center">
          Your photo was rejected. Please upload a new one.
        </p>
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default PhotoCard;
