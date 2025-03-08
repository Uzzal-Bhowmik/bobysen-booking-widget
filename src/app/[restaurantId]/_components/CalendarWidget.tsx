"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMinutes,
  parse,
  addMonths,
  startOfMonth,
  getDay,
  getDaysInMonth,
  isBefore,
} from "date-fns";
import { cn } from "@/lib/utils";

type ComponentProps = {
  selectedDate?: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  guests: number;
  setGuests: Dispatch<SetStateAction<number>>;
};

export default function CalendarWidget({
  selectedDate,
  setSelectedDate,
  time,
  setTime,
  guests,
  setGuests,
}: ComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date()); // February 2025

  // Get days in current month
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getDay(startOfMonth(currentDate)); // Get day of week for first day
  const padding = Array.from({ length: startDay }, () => null);

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDate((prev) =>
      direction === "next" ? addMonths(prev, 1) : addMonths(prev, -1),
    );
  };

  const handleTimeChange = (direction: "up" | "down") => {
    const currentTime = parse(time, "HH:mm", new Date());
    const newTime =
      direction === "up"
        ? addMinutes(currentTime, 15)
        : addMinutes(currentTime, -15);
    setTime(format(newTime, "HH:mm"));
  };

  // direction: "up" | "down"
  const handleGuestChange = (direction: "up" | "down") => {
    setGuests((prev) => {
      if (direction === "up") return prev + 1;
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
  };

  return (
    <div className="w-full rounded-lg border bg-white p-6 pb-2 text-gray-900 shadow-sm select-none">
      {/* Calendar Header */}
      <div className="mb-8 flex items-center justify-between">
        <ChevronLeft
          className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => handleMonthChange("prev")}
        />
        <h2 className="text-xl font-normal">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <ChevronRight
          className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => handleMonthChange("next")}
        />
      </div>

      {/* Calendar Grid */}
      <div className="mb-6 grid grid-cols-7 gap-1">
        {/* Day headers */}
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="py-1.5 text-center text-xs text-gray-500">
            {day}
          </div>
        ))}

        {/* Days */}
        {[
          ...padding,
          ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ].map((day, index) => {
          const today = new Date();

          // Check if the date is today
          const isToday =
            today.getFullYear() === currentDate.getFullYear() &&
            today.getMonth() === currentDate.getMonth() &&
            day === today.getDate();

          // Find out all the previous days for disabling
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day as number,
          );
          const isPast = isBefore(date, today.setHours(0, 0, 0, 0)); // Check if it's before today

          return (
            <button
              key={index}
              onClick={() => day && handleDateSelect(day)}
              className={cn(
                "flex aspect-square size-12 items-center justify-center rounded-full text-sm transition-colors duration-200 disabled:text-gray-300",
                day && "cursor-pointer",
                day &&
                  day !== selectedDate?.getDate() &&
                  day !== currentDate.getDate() &&
                  "hover:bg-gray-200",

                isToday && selectedDate === undefined
                  ? "bg-secondary-3 text-white"
                  : "",
                selectedDate?.getDate() === day
                  ? "[&:not(:disabled)]:bg-secondary-3 text-white"
                  : "",
                isToday && selectedDate?.getDate() !== day
                  ? "bg-black/85 text-white"
                  : "",
              )}
              disabled={isPast}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Guests Selector */}
      <div className="border-t border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <ChevronLeft
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleGuestChange("down")}
          />
          <div className="text-center">
            <div className="text-xl">{guests}</div>
            <div className="text-sm text-gray-500">Guests</div>
          </div>
          <ChevronRight
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleGuestChange("up")}
          />
        </div>
      </div>

      {/* Time Selector */}
      <div className="border-t border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <ChevronLeft
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleTimeChange("down")}
          />
          <div className="text-center">
            <div className="text-xl">{time}</div>
            <div className="text-sm text-gray-500">Time</div>
          </div>
          <ChevronRight
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleTimeChange("up")}
          />
        </div>
      </div>
    </div>
  );
}
