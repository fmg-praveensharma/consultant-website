import { FC } from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  orderId: number;
  date: string;
  name: string | undefined;
  rating: number;
  service: string;
  review: string;
}

const ReviewCard: FC<ReviewCardProps> = ({
  orderId,
  date,
  name,
  rating,
  service,
  review,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg transition hover:shadow-lg">
      <div className="flex justify-between mb-2">
        <div className="font-semibold">Order ID: {orderId}</div>
        <div className="text-gray-500">{date}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{name}</div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Service: </span>
        <span className="text-blue-500 cursor-pointer">{service}</span>
      </div>
      <div className="text-gray-700">{review}</div>
    </div>
  );
};

export default ReviewCard;
