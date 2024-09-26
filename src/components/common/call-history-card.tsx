// components/CallCard.tsx
import { Slot } from "@radix-ui/react-slot";

interface CallCardProps {
  orderId: string;
  duration: string | number;
  userName: string;
  earning: string;
  rate: string;
  status: string;
  orderTime: string;
}

const CallCard: React.FC<CallCardProps> = ({
  orderId,
  duration,
  userName,
  earning,
  rate,
  status,
  orderTime,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg transition hover:shadow-lg">
      {orderId && (
        <div className="mb-1">
          <span className="font-bold">Order Id:</span> {orderId}
        </div>
      )}
      {duration && (
        <div className="mb-1">
          <span className="font-bold">Duration:</span> {duration} min
        </div>
      )}
      {userName && (
        <div className="mb-1">
          <span className="font-bold">User Name:</span> {userName}
        </div>
      )}
      {earning && (
        <div className="mb-1">
          <span className="font-bold">Earning:</span> ₹ {earning}
        </div>
      )}
      {rate && (
        <div className="mb-1">
          <span className="font-bold">Rate:</span> ₹ {rate} /min
        </div>
      )}
      {status && (
        <div className="mb-1">
          <span className="font-bold">Status:</span>
          <span className="text-green-500">{status}</span>
        </div>
      )}
      {orderTime && (
        <div className="mb-2">
          <span className="font-bold">Order Time:</span> {orderTime}
        </div>
      )}
    </div>
  );
};
export default CallCard;
