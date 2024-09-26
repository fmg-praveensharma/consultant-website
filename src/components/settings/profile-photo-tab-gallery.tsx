// components/ProfilePhoto.tsx
import React, { useState, useEffect } from "react";
import { useGetConsultantDetailQuery } from "@/store/services";

const ProfilePhoto: React.FC = () => {
  const [data, setData] = useState([]);

  const { data: fetchData, error, isLoading } = useGetConsultantDetailQuery();
  useEffect(() => {
    if (fetchData) {
      const photo = fetchData?.data?.photos?.filter(
        (item: any) => item.photo_type == 1
      );
      setData(photo);
    }
  }, [fetchData]);

  const response = data.map((item) => item?.url);
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <img src={response} alt="Profile" className="w-full rounded-lg mb-4" />
      </div>
    </div>
  );
};

export default ProfilePhoto;
