// components/OtherPhotos.tsx
import React, { useState, useEffect } from "react";
import PhotoCard from "./photo-card-gallery";
import DeleteConfirmationModal from "./delete-confirmation-model";
import {
  useGetConsultantDetailQuery,
  useDeleteGalleryMutation,
} from "@/store/services";

export type PhotoStatus = "pending" | "approved" | "rejected";

const OtherPhotos: React.FC = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]); // Specify type if known

  const { data: fetchData, error, isLoading } = useGetConsultantDetailQuery();
  useEffect(() => {
    if (fetchData) {
      const photos = fetchData?.data?.photos?.filter(
        (item: any) => item.photo_type === 3
      );
      setData(photos || []);
    }
  }, [fetchData]);

  const [deleteImage] = useDeleteGalleryMutation();

  const handleDeleteClick = (id: number) => {
    console.log("id.........", id);
    setSelectedPhotoId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteImage({ id: selectedPhotoId }).unwrap();
      setData((prevData) =>
        prevData.filter((photo) => photo.id !== selectedPhotoId)
      );
    } catch (error) {
      console.error("Failed to delete the image:", error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const PhotoStatus: Record<number, string> = {
    1: "pending",
    2: "approved",
    3: "rejected",
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            status={PhotoStatus[photo.status]}
            src={photo.url}
            onDelete={() => handleDeleteClick(photo.id)}
          />
        ))}
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default OtherPhotos;
