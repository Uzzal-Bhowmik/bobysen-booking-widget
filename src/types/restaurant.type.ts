export type TRestaurant = {
  _id: string
  name: string
  address: string
  helpLineNumber1: number
  helpLineNumber2: number
  location: TRestaurantLocation
  description: string
  status: string
  images: TRestaurantImage[]
  reviewStatus: boolean
  avgReviews: number
  days: TRestaurantDay[]
}

type TRestaurantLocation = {
  coordinates: number[]
  type: string
}

type TRestaurantImage = {
  url: string
  _id: string
}

type TRestaurantDay = {
  day: string
  openingTime: string
  closingTime: string
}
