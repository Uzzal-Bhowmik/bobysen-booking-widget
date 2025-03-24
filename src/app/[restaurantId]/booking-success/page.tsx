import SuccessLottie from "@/animations/success-lottie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchRestaurant } from "../page";

interface PageProps {
  params: Promise<{
    restaurantId: string;
  }>;
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { restaurantId } = await params;
  const restaurant = (await fetchRestaurant(restaurantId))?.data;
  return (
    <div className="flex h-[calc(100dvh-2.5em)] flex-col items-center justify-center gap-y-4 rounded-lg">
      <SuccessLottie />

      <div className="flex-center -mt-4 text-center">
        <div className="max-h-fit overflow-hidden delay-[2500ms]">
          <h2 className="text-primary-orange text-secondary-3 text-5xl font-bold">
            Congratulations!
          </h2>

          <p className="text-secondary-1 mt-5 mb-8 text-lg">
            Your booking was successful at{" "}
            <span className="font-bold">{restaurant?.name}</span>.
          </p>

          <div className="mx-auto flex w-max items-center gap-x-5">
            <Button
              size="xl"
              variant="primary"
              className="rounded-full"
              asChild
            >
              <Link href={`/${restaurantId}`}>Book More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
