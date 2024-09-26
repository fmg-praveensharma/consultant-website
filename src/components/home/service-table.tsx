"use client";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import {
  useGetConsultantDetailQuery,
  useGetConsultantServiceListQuery,
  useUpdateConsultantStatusMutation,
} from "@/store/services";

interface Service {
  type: number;
  customerPrice: string;
  discountPrice: string;
  available: boolean;
  price_list: any;
  discount_price: any;
  current_price: any;
  feature: any;
}

export const serviceType: Record<number, string> = {
  1: "Chat",
  2: "Audio Call",
  3: "Video Call",
  4: "Anonymous Call",
  5: "Private Call",
};

const ServiceTable: React.FC = () => {
  const [data, setData] = useState<Service[]>([]);

  // Fetching consultant service type (price) details
  const {
    data: fetchData,
    isLoading,
    refetch,
    isFetching,
  } = useGetConsultantDetailQuery({
    code: 1,
  });

  // Fetching consultant availability status
  const { data: consultantStatus } = useGetConsultantServiceListQuery({
    page: 1,
    limit: 10,
  });

  // Mutation for updating consultant status
  const [updateConsultantStatus] = useUpdateConsultantStatusMutation();

  // Processing service data and merging with status
  useEffect(() => {
    if (fetchData) {
      const allowedFeatures = [1, 2, 3];
      const response =
        fetchData?.data?.price_list?.filter((type: any) =>
          allowedFeatures.includes(type.feature)
        ) || [];

      if (consultantStatus) {
        console.log("consultant status ", consultantStatus);
        // Merge status into service data
        const mergedData = response.map((service: any) => {
          const matchingStatus = consultantStatus?.data?.find(
            (status: any) => status.type === service.feature
          );
          return {
            ...service,
            available: matchingStatus?.status === 1,
            type: matchingStatus?.type,
          };
        });

        setData(mergedData);
      } else {
        setData(response);
      }
    }
  }, [fetchData, consultantStatus]);

  // Function to handle toggle switch
  const onToggle = async (service: Service) => {
    const newStatus = service.available ? 0 : 1;

    try {
      await updateConsultantStatus({
        type: service.type,
        body: { status: newStatus },
      }).unwrap();

      // Update local state to reflect change
      setData((prevData) =>
        prevData.map((item) =>
          item.type === service.type
            ? { ...item, available: !service.available }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="mb-5 overflow-x-auto">
      <div className="overflow-x-auto rounded-sm">
        <table className="min-w-full bg-white shadow-md table-auto">
          <thead>
            <tr className="bg-[#FFA643]">
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-lg md:text-lg font-bold text-black">
                Service Type
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-lg md:text-lg font-bold text-black">
                Type
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-lg md:text-lg font-bold text-black">
                Customer Price
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-lg md:text-lg font-bold text-black">
                Discount Price
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-lg md:text-lg font-bold text-black">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((service, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-lg text-gray-700">
                  {serviceType[service.feature] || "Unknown"}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-lg text-gray-700">
                  {service.type}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-lg text-gray-700">
                  {service.current_price}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-lg text-gray-700">
                  {service.discount_price}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-lg text-gray-700">
                  <Switch
                    className="ml-0 md:ml-4"
                    checked={service.available}
                    onClick={() => onToggle(service)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
