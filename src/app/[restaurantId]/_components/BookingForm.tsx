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

type FormLabelWithSuffixProps = {
  children: ReactNode;
  htmlFor?: string;
  isOptional?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

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

export default function BookingForm() {
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

  // Calender widget values
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>("15:00");
  const [guests, setGuests] = useState<number>(1);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Payload
    const payload = {
      ...values,
      date: selectedDate,
      time,
      guests,
    };

    console.log(payload);
  };

  return (
    <div className="space-y-3 rounded-lg border bg-white p-6 shadow-xl duration-700 lg:space-y-7">
      <div className="!mb-10 space-y-1.5 text-center">
        <h3 className="text-secondary-1 text-[26px] font-semibold text-balance">
          Welcome To <span className="text-secondary-3">[Restaurant Name]</span>
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
          <RestaurantOpeningHours />
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        className="h-11 w-full text-base font-semibold"
        onClick={() => {
          formSubmitButtonRef.current?.click();
        }}
      >
        Book Now
      </Button>
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
