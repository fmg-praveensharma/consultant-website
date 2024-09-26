// components/common/NoRecordFound.tsx

import React from "react";
import { OctagonX } from "lucide-react";

const NoRecordFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <OctagonX className="h-20 w-20 mb-10 opacity-60" />
      <h2 className="text-xl font-semibold text-gray-700">No Record Found</h2>
      <p className="text-gray-500">
        Try adjusting your filters or date range to find more results.
      </p>
    </div>
  );
};

export default NoRecordFound;
