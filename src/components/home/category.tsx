// components/Category.tsx
"use client";
import React, { useState } from "react";

const categories = [
  "Child Name",
  "Business Name",
  "Gemstone",
  "Stock Market",
  "Love",
  "Foreign Travel",
  "Education",
  "Finance",
  "Wealth and Property",
  "Health",
  "Vastu",
  "Family Life",
  "Government Job",
  "Shubh Muhurta",
];

const Category: React.FC<{
  onSubmit: (selectedCategories: string[]) => void;
}> = ({ onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedCategories);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <p className="mb-4">
        Please select the areas where you are most comfortable to answer the
        User.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full border ${
              selectedCategories.includes(category)
                ? "bg-[#121E31] text-white"
                : "bg-white text-black"
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-[#121E31] text-white rounded-lg hover:bg-[#121E31]"
      >
        Submit
      </button>
    </div>
  );
};

export default Category;
