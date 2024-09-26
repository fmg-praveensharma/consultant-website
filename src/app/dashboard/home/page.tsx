"use client";
import React, { useState } from "react";
import ServiceTable from "@/components/home/service-table";
import Modal from "@/components/common/modal";
import Category from "@/components/home/category";
import HomeButtonGroup from "@/components/home/button-group";
import { FeedbackForm } from "@/components/home/feedback-form";
import { NoticeBoard } from "@/components/home/notice-board";
import { ImportantPolicies } from "@/components/home/policies";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleCategorySubmit = (selectedCategories: string[]) => {
    console.log("Selected Categories:", selectedCategories);
    handleCloseCategoryModal();
  };
  return (
    <div>
      <ServiceTable />
      <Button
        onClick={handleOpenCategoryModal}
        className="px-4 py-2 bg-[#121E31] text-white text-lg rounded-sm hover:bg-[#121E31] mb-5"
      >
        Open Category Selection
      </Button>
      <HomeButtonGroup />
      <div className="flex flex-col md:flex-row gap-6 pt-10">
        <div className="flex-1">
          <FeedbackForm />
        </div>
        <div className="flex-1">
          <NoticeBoard />
          <ImportantPolicies />
        </div>
      </div>

      <Modal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
        <Category onSubmit={handleCategorySubmit} />
      </Modal>
    </div>
  );
};

export default HomePage;
