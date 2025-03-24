import { notFound } from "next/navigation";
import BookingForm from "./_components/BookingForm";
import { getBackendUrl } from "@/config/envConfig";
import { TRestaurant } from "@/types";

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
  const restaurant: TRestaurant = (await fetchRestaurant(restaurantId))?.data;

  return {
    title: `${restaurant.name} | BookaTable`,
    description: `Book your table at ${restaurant.name}`,
    openGraph: {
      title: `${restaurant.name} | BookaTable`,
      description: `Book your table at ${restaurant.name}`,
      images:
        restaurant?.images?.length > 0
          ? restaurant?.images?.map((image) => ({
              url: image.url,
              width: 1200,
              height: 630,
              alt: restaurant.name,
            }))
          : [],
    },
  };
}

export default async function BookRestaurant({ params }: PageProps) {
  const { restaurantId } = await params;
  const restaurant = await fetchRestaurant(restaurantId);

  return (
    <div className="my-8">
      <BookingForm restaurant={restaurant?.data} />
    </div>
  );
}
