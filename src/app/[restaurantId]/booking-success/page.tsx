import SuccessLottie from "@/animations/success-lottie";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    restaurantId: string;
  }>;
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { restaurantId } = await params;

  return (
    <div className="flex h-[calc(100dvh_-_130px)] flex-col items-center justify-center gap-y-4 rounded-lg border bg-white shadow-xl">
      <SuccessLottie />

      <div className="flex-center -mt-4 text-center">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 2.2,
            type: "spring",
            stiffness: 250,
            damping: 30,
            mass: 0.2,
          }}
          className="max-h-fit overflow-hidden"
        >
          <h2 className="text-primary-orange text-secondary-3 text-5xl font-bold">
            Congratulations!
          </h2>

          <p className="text-secondary-1 mt-5 mb-8 text-lg">
            Your booking was successful at [restaurant name].
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
        </motion.div>
      </div>
    </div>
  );
};

export default page;
