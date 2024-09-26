// src/lib/otp.ts

// Use the same base URL from environment variables
const baseUrl = process.env.API_URL || "/api";

export async function verifyOtp(
  phoneNumber: string,
  otp: string
): Promise<boolean> {
  const response = await fetch(`${baseUrl}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, otp }),
  });

  const result = await response.json();
  return result.success;
}

export async function getUserByPhoneNumber(phoneNumber: string) {
  const response = await fetch(`${baseUrl}/get-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  const user = await response.json();
  return user;
}
