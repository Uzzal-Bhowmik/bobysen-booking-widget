import { notFound } from "next/navigation";
import BookingForm from "./_components/BookingForm";
import { getBackendUrl } from "@/config/envConfig";

type PageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

export const revalidate = 3600;

async function fetchRestaurant(restaurantId: string) {
  const result = await fetch(
    (getBackendUrl() as string) + `/restaurants/${restaurantId}`,
    {
      method: "GET",
    },
  ).then((res) => res.json());

  if (!result?.success && result?.err?.statusCode === 404) {
    return notFound();
  }

  if (!result.success && result.err?.statusCode !== 404) {
    throw new Error(result.message);
  }

  return result;
}

export async function generateMetadata({ params }: PageProps) {
  const { restaurantId } = await params;
  const restaurant = await fetchRestaurant(restaurantId);

  return {
    title: `${restaurant.data.name} | BookaTable`,
    description: `Book your table at ${restaurant.data.name}`,
    openGraph: {
      title: `${restaurant.data.name} | BookaTable`,
      description: `Book your table at ${restaurant.data.name}`,
    },
  };
}

export default async function BookRestaurant({ params }: PageProps) {
  const { restaurantId } = await params;
  const restaurant = await fetchRestaurant(restaurantId);

  return (
    <div className="mt-6 mb-10">
      <BookingForm restaurant={restaurant?.data} />
    </div>
  );
}
