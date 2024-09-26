// components/RequestPriceModal.tsx
"use client";
import React, { useState } from "react";
import Modal from "./modal-common";
import { useCreateConsultantPriceReqMutation } from "@/store/services";

interface RequestPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    feature: string,
    requested_current_price: string,
    discountPrice: string,
    category: string
  ) => void;
}

const RequestPriceModal: React.FC<RequestPriceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [feature, setfeature] = useState("");
  const [category, setCategory] = useState("");
  const [requested_current_price, setrequested_current_price] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  // Use the mutation hook
  const [createPriceRequest, { isLoading, isError, isSuccess }] =
    useCreateConsultantPriceReqMutation();

  const handleSubmit = async () => {
    const payload = {
      feature: Number(feature) || "",
      category: Number(category) || "",
      requested_current_price: Number(requested_current_price) || "",
      requested_discount_price: Number(discountPrice) || "",
    };


   

    try { 
      await createPriceRequest(payload ).unwrap();
      onSubmit(feature, requested_current_price, discountPrice, category);
      onClose();
    } catch (error) {
      console.error("Failed to create price request:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Request New Price</h2>

      <select
        value={feature}
        onChange={(e) => setfeature(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg"
      >
        <option value="" disabled>
          Select Service Type
        </option>
        <option value="1">Chat</option>
        <option value="2">Audio Call</option>
        <option value="3">Video Call</option>
        <option value="4">Anonymous Call</option>
        <option value="5">Private Call</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg"
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
        <option value="4">D</option>
      </select>

      <input
        type="text"
        value={requested_current_price}
        onChange={(e) => setrequested_current_price(e.target.value)}
        placeholder="Requested Current Price"
        className="w-full mb-4 p-2 border rounded-lg"
      />

      <input
        type="text"
        value={discountPrice}
        onChange={(e) => setDiscountPrice(e.target.value)}
        placeholder="Requested Discount Price"
        className="w-full mb-4 p-2 border rounded-lg"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full px-4 py-2 bg-[#051D41] text-white rounded-lg hover:bg-[#051D41] ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {isError && (
        <p className="text-red-500 mt-2">
          Failed to submit the request. Please try again.
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 mt-2">
          Price request submitted successfully!
        </p>
      )}
    </Modal>
  );
};

export default RequestPriceModal;
