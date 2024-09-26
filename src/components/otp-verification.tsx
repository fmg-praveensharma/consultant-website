// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Wheat } from "lucide-react";
// import { useVerifyOtpMutation } from "@/store/services/authApi";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/store/slices/authSlice";

// interface VerificationProps {
//   phoneNumber: string;
// }

// const Verification: React.FC<VerificationProps> = ({ phoneNumber }) => {
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//   const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [verifyOtp] = useVerifyOtpMutation();
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   useEffect(() => {
//     setIsOtpValid(otp.every((digit) => digit.length === 1));
//   }, [otp]);

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     if (!value && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = "";
//       setOtp(newOtp);
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { status, message, data } = await verifyOtp({
//         phoneNumber,
//         otp: +otp.join(""),
//         device_id: "<string>", // Replace with actual device ID
//         device_token: "<string>", // Replace with actual device token
//         country_code: "+91",
//       }).unwrap();

//       if (status) {
//         dispatch(setCredentials({ auth_token: data.auth_token, user: data }));
//         router.push("/dashboard/home");
//       } else {
//         setErrorMessage("Invalid Otp");
//       }
//     } catch (error) {
//       console.error("Incorrect OTP", error);
//       setErrorMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="w-1/2 bg-[#121E31] flex items-center justify-center">
//         <Wheat className="h-40 w-28 text-white" />
//       </div>
//       <div className="w-1/2 bg-gray-100 flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="w-3/4 max-w-md p-8 bg-white rounded-sm shadow-md"
//         >
//           <h2 className="text-2xl font-semibold mb-6">Verify your account</h2>
//           <p className="mb-4 text-gray-600">
//             Type in the verification code we sent you on {phoneNumber}
//           </p>
//           <div className="flex justify-between mb-4">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 maxLength={1}
//                 ref={(el) => {
//                   inputRefs.current[index] = el;
//                 }}
//                 className="w-12 h-12 text-center text-lg border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             ))}
//           </div>
//           <p className="mb-4 text-gray-600">
//             No code received?{" "}
//             <a href="#" className="text-blue-600">
//               Resend code
//             </a>
//           </p>
//           {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
//           <button
//             type="submit"
//             disabled={!isOtpValid}
//             className={`w-full px-4 py-2 rounded-sm text-white ${
//               isOtpValid ? "bg-[#121E31] hover:bg-[#121E31]" : "bg-gray-400"
//             }`}
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Verification;
