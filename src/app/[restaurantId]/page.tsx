import BgFlowers from "@/components/BgFlowers";
import BookingForm from "./_components/BookingForm";

type PageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

export default async function BookRestaurant({ params }: PageProps) {
  const { restaurantId } = await params;
  console.log({ restaurantId });

  return (
    <div className="mt-6 mb-10">
      <BookingForm />
      <BgFlowers />
    </div>
  );
}
