import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type OpeningHour = {
  day: string;
  openingTime: string;
  closingTime: string;
};

type RestaurantOpeningHoursProps = {
  days: OpeningHour[];
};

export default function RestaurantOpeningHours({
  days,
}: RestaurantOpeningHoursProps) {
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
          {days?.map((dayTime: OpeningHour, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-sm bg-white px-4 py-1.5 text-sm text-black"
            >
              <p className="capitalize">{dayTime.day}</p>

              {dayTime?.openingTime !== "00:00" &&
              dayTime?.closingTime !== "00:00" ? (
                <div className="flex items-center gap-x-3">
                  <p>{dayTime.openingTime}</p>
                  <p>-</p>
                  <p>{dayTime.closingTime}</p>
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
