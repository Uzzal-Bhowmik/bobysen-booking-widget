/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useRef, useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { getNodeEnv } from "@/config/envConfig";
import CalendarWidget from "./CalendarWidget";
import RestaurantOpeningHours from "./RestaurantOpeningHours";
import { TRestaurant } from "@/types";
import useBooking from "@/hooks/api/useBooking";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { format } from "date-fns";
import VerifyOtpModal from "./VerifyOtpModal";

type FormLabelWithSuffixProps = {
  children: ReactNode;
  htmlFor?: string;
  isOptional?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

type BookingFormProps = {
  restaurant: TRestaurant;
};

// Motion Variants

// Zod validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Invalid email" }),
  phoneNumber:
    getNodeEnv() === "development"
      ? z
          .string({ required_error: "Phone number is required" })
          .min(1, "Phone number is required")
      : z
          .string({ required_error: "Phone number is required" })
          .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export default function BookingForm({ restaurant }: BookingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const formSubmitButtonRef = useRef<HTMLButtonElement>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);

  // User info states
  const [countryCode, setCountryCode] = useState<string | undefined>("");

  // Calender widget states
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>("15:00");
  const [guests, setGuests] = useState<number>(1);

  // Request booking api handler
  const [requestBookingLoading, setRequestBookingLoading] =
    useState<boolean>(false);
  const { requestBooking } = useBooking();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // This payload will be used after submitting booking request
    // and when verifying otp
    const confirmBookingPayload = {
      otp: "",
      token: "",
      phoneNumber: values.phoneNumber,
      restaurant: restaurant._id,
      date: format(selectedDate as Date, "yyyy-MM-dd"),
      time,
      seats: guests,
      countryCode: countryCode || "",
    };

    try {
      setRequestBookingLoading(true);

      const res = await requestBooking({
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phoneNumber: values.phoneNumber,
        countryCode: countryCode as string,
        restaurant: restaurant?._id,
      });

      // Store payload in session storage
      if (res?.success) {
        confirmBookingPayload["token"] = res.data;

        setToSessionStorage(
          "booking_payload",
          JSON.stringify(confirmBookingPayload),
        );

        setIsOtpModalOpen(true);
        form.reset();
      }
    } catch (error: any) {
      if (error?.err?.name === "ValidationError") {
        return toast.error(error?.errorSources?.[0]?.message);
      }

      toast.error(
        error?.message || error?.data?.message || "Something went wrong",
      );
    } finally {
      setRequestBookingLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border bg-white p-6 shadow-xl duration-700 lg:space-y-7">
      <div className="!mb-10 space-y-1.5 text-center">
        <h3 className="text-secondary-1 text-[30px] font-bold text-balance">
          Welcome to{" "}
          <span className="text-secondary-3">{restaurant?.name}</span>
        </h3>
        <p className="text-secondary-1/75 text-xl">
          Let&apos;s book your table.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 space-y-5 gap-x-6 lg:grid-cols-2 lg:space-y-7 lg:gap-y-3"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithOptionalitySuffix
                  isOptional={false}
                  htmlFor="firstName"
                  className="mb-0.5"
                >
                  First Name
                </FormLabelWithOptionalitySuffix>
                <FormControl>
                  <Input
                    className="border-secondary-2/50"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithOptionalitySuffix
                  htmlFor="lastName"
                  className="mb-0.5"
                >
                  Last Name
                </FormLabelWithOptionalitySuffix>
                <FormControl>
                  <Input
                    className="border-secondary-2/50"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithOptionalitySuffix
                  htmlFor="email"
                  className="mb-0.5"
                  isOptional={false}
                >
                  Email
                </FormLabelWithOptionalitySuffix>
                <FormControl>
                  <Input
                    type="email"
                    className="border-secondary-2/50"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithOptionalitySuffix
                  isOptional={false}
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </FormLabelWithOptionalitySuffix>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="MU"
                    international
                    placeholder="Enter your phone number"
                    onCountryChange={(value) => {
                      setCountryCode(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="hidden" ref={formSubmitButtonRef}>
            Submit
          </Button>
        </form>
      </Form>

      {/* Calendar Widget */}
      <div className="flex flex-col-reverse items-start justify-between gap-6 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <CalendarWidget
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            time={time}
            setTime={setTime}
            guests={guests}
            setGuests={setGuests}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <RestaurantOpeningHours days={restaurant?.days} />
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        className="h-11 w-full text-base font-semibold"
        onClick={() => {
          formSubmitButtonRef.current?.click();
        }}
        disabled={requestBookingLoading}
      >
        {requestBookingLoading ? (
          <span className="flex items-center justify-center gap-x-1">
            <Loader className="mr-2 size-5 animate-spin" />
            Please Wait...
          </span>
        ) : (
          "Book Now"
        )}
      </Button>

      {/* Otp Verification Modal */}
      <VerifyOtpModal open={isOtpModalOpen} setOpen={setIsOtpModalOpen} />
    </div>
  );
}

const FormLabelWithOptionalitySuffix = ({
  children,
  htmlFor = "",
  isOptional = true,
  ...props
}: FormLabelWithSuffixProps): ReactNode => {
  return (
    <FormLabel htmlFor={htmlFor} {...props}>
      <span className="text-black/85">{children}</span>
      {!isOptional && (
        <span className="text-destructive-foreground -ml-1">*</span>
      )}
    </FormLabel>
  );
};
