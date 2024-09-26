// components/PriceCard.tsx
import React from "react";

interface PriceCardProps {
  serviceType: string;
  currentPrice: string;
  discountPrice: number;
  flute_share: string;
  your_share: any;
}

const PriceCard: React.FC<PriceCardProps> = ({
  serviceType,
  currentPrice,
  discountPrice,
  flute_share,
  your_share,
}) => {
  return (
    <div className="flex w-full p-4 bg-white  mb-4 shadow rounded-lg transition hover:shadow-lg">
      <div className="w-1/4 p-4 bg-[#E5F4FF] rounded-lg flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold">Service Type</h3>
        <p className="">{serviceType}</p>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Current Price</p>
            <p>{currentPrice}</p>
          </div>
          <div>
            <p className="font-semibold">Discount Price</p>
            <p>{discountPrice}</p>
          </div>
          <div>
            <p className="font-semibold">Flute Share</p>
            <p>{flute_share}</p>
          </div>
          <div>
            <p className="font-semibold">Your Share</p>
            <p>{your_share}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
