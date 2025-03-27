/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
} from "@/utils/sessionStorage";
import useBooking from "@/hooks/api/useBooking";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { Info } from "lucide-react";

interface VerifyOtpModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  open = true,
  setOpen,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const currentPathname = usePathname();
  const router = useRouter();

  // Get phone number from session storage
  const confirmBookingPayload = getFromSessionStorage("booking_payload");

  // Handle verify otp
  const { confirmBooking } = useBooking();
  const handleVerifyOtp = async () => {
    if (otp?.length !== 4) return toast.error("Please enter a valid OTP!");

    if (!confirmBookingPayload?.token) {
      return toast.error("Something went wrong! Try again.");
    }

    try {
      setIsLoading(true);
      setError("");

      const token = confirmBookingPayload.token;
      delete confirmBookingPayload.token;

      const res = await confirmBooking({
        payload: { ...confirmBookingPayload, otp },
        token,
      });

      if (res?.success) {
        setOpen(false);
        setOtp("");
        router.push(currentPathname + "/booking-success");

        // Clear session storage data
        removeFromSessionStorage("booking_payload");
      }
    } catch (error: any) {
      console.log({ error });

      setError(
        error?.message || error?.data?.message || "Something went wrong!",
      );
    } finally {
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setIsLoading(false);
        setError("");
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Verify OTP</AlertDialogTitle>
          <AlertDialogDescription>
            An OTP has been sent to your phone number
            <span className="font-semibold">
              {" " + confirmBookingPayload?.phoneNumber}
            </span>
            . <br /> OTP Expires in{" "}
            <span className="font-semibold">5 minutes</span>.
          </AlertDialogDescription>

          <div className="mt-2 w-max">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={(value) => setOtp(value)}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              autoFocus
            >
              <InputOTPGroup>
                {Array.from({ length: 4 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-11 border-black/25 text-xl font-bold shadow-none"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Show Error */}
          {error && (
            <div className="mt-2 flex items-center justify-start gap-x-2">
              <div className="flex aspect-square size-7 items-center justify-center rounded-full bg-red-600/20">
                <Info className="size-4 text-red-600" />
              </div>

              <p className="text-sm font-semibold text-red-600">{error}</p>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="destructive">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="primary"
            disabled={otp?.length !== 4 || isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleVerifyOtp();
            }}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerifyOtpModal;
