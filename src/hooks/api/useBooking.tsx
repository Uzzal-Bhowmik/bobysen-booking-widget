import { getBackendUrl } from "@/config/envConfig";

type BookingPayload = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  restaurant: string;
};

type ConfirmBookingPayload = {
  otp: string;
  phoneNumber: string;
  restaurant: string;
  date: string;
  time: string;
  seats: number;
};

type ConfirmBooking = {
  payload: ConfirmBookingPayload;
  token: string;
};

export default function useBooking() {
  const requestBooking = async (data: BookingPayload) => {
    const response = await fetch(
      getBackendUrl() + "/users/widget/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    ).then((res) => res.json());

    if (!response.success) {
      throw response;
    }

    return response;
  };

  const confirmBooking = async (data: ConfirmBooking) => {
    const response = await fetch(getBackendUrl() + "/otp/verify/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.payload),
    }).then((res) => res.json());

    if (!response.ok) {
      throw response;
    }

    return response;
  };

  return { requestBooking, confirmBooking };
}
