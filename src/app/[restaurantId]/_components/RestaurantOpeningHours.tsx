import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type OpeningHour = {
  day: string;
  openingHour: string;
  closingHour: string;
};

// Fake opening hours
const openingHours: OpeningHour[] = [
  {
    day: "Sun",
    openingHour: "07:00",
    closingHour: "23:00",
  },
  {
    day: "Mon",
    openingHour: "07:00",
    closingHour: "23:00",
  },
  {
    day: "Tue",
    openingHour: "07:00",
    closingHour: "23:00",
  },
  {
    day: "Wed",
    openingHour: "07:00",
    closingHour: "23:00",
  },
  {
    day: "Thu",
    openingHour: "00:00",
    closingHour: "00:00",
  },
  {
    day: "Fri",
    openingHour: "07:00",
    closingHour: "23:00",
  },
  {
    day: "Sat",
    openingHour: "07:00",
    closingHour: "23:00",
  },
];

export default function RestaurantOpeningHours() {
  const [showOpeningHours, setShowOpeningHours] = useState<boolean>(false);

  return (
    <div>
      {/* Show opening hours button for smaller devices */}
      <Button
        variant="ghost"
        className={cn(
          "text-secondary-3 w-full justify-end !p-0 lg:hidden",
          showOpeningHours && "mb-2",
        )}
        onClick={() => setShowOpeningHours(!showOpeningHours)}
      >
        Show Opening Hours{" "}
        <ChevronDown
          className={cn(
            "rotate-0 transition-transform duration-300 ease-in-out",
            showOpeningHours && "rotate-180",
          )}
        />
      </Button>

      {/* Opening Hours Table */}
      <div
        className={cn(
          "bg-secondary-3 text-primary-white-light transition-[height, padding] h-0 rounded-md duration-300 ease-in-out lg:!h-auto lg:p-5 lg:pb-8",
          showOpeningHours && "h-[440px] p-5 pb-8",
        )}
      >
        <h3 className="text-center text-2xl font-semibold">Opening Hours</h3>

        <div className="mt-2 mb-5 h-[0.5px] w-full bg-gray-300" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {openingHours.map((dayTime: OpeningHour, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-sm bg-white px-4 py-1.5 text-sm text-black"
            >
              <p>{dayTime.day}</p>

              {dayTime?.openingHour !== "00:00" &&
              dayTime?.closingHour !== "00:00" ? (
                <div className="flex items-center gap-x-3">
                  <p>{dayTime.openingHour}</p>
                  <p>-</p>
                  <p>{dayTime.closingHour}</p>
                </div>
              ) : (
                <span className="text-destructive-foreground">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
