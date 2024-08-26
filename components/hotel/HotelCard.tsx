/** @format */

"use client"

import { usePathname, useRouter } from "next/navigation"
import { HotelWithRooms } from "./AddHotelForm"
import { cn } from "@/lib/utils"
import Image from "next/image"
import AmenityItem from "../AmenityItem"
import { Dumbbell, MapPin, Waves } from "lucide-react"
import useLocation from "@/hooks/useLocation"
import { Button } from "../ui/button"
import { FaSwimmer } from "react-icons/fa"
import { useState } from "react"
import Loader from "../ui/Loader"

function HotelCard({ hotel }: { hotel: HotelWithRooms }) {

  const [imageLoading, setImageLoading] = useState(true);

  const pathname = usePathname()
  const isMyHotel = pathname.includes("my-hotels")
  const router = useRouter()

  const { getCountryByCode } = useLocation()
  const country = getCountryByCode(hotel.country)

  const ImageSkeleton = () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-s-lg" />
  );

  return (
    <div
      onClick={() => !isMyHotel && router.push(`/hotel-details/${hotel.id}`)}
      className={cn(
        "col-span-1 cursor-pointer transition hover:scale-105",
        isMyHotel && "cursor-default"
      )}>
      <div className='flex gap-2 bg-background/50 border border-primary/10 rounded-lg'>
        <div className='flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg'>
          {imageLoading && <Loader/>}
          <Image
            fill
            src={hotel.image}
            alt={hotel.title}
            className={cn(
              'w-full h-full object-cover',
              imageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
            )}
            onLoadingComplete={() => setImageLoading(false)}
          />
        </div>

        <div className='flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm'>
          <div className='font-semibold text-xl'>{hotel.title}</div>
          <div className='text-primary/90'>
            {hotel.description.substring(0, 45)}...
          </div>
          <div className='text-primary/90'>
            <AmenityItem>
              <MapPin className='w-4 h-4' /> {country?.name}, {hotel.city}
            </AmenityItem>
            {hotel.swimmingPool && (
              <AmenityItem>
                <FaSwimmer size={18} />Pool
              </AmenityItem>
            )}
            {hotel.gym && (
              <AmenityItem>
                <Dumbbell className='w-4 h-4' />
                Gym
              </AmenityItem>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              {hotel?.rooms[0]?.roomPrice && (
                <>
                  <div className='font-semibold text-base'>
                    ${hotel?.rooms[0].roomPrice}
                  </div>
                  <div className='text-xs'>/ 24hrs</div>
                </>
              )}
            </div>
            {isMyHotel && (
              <Button
                onClick={() => router.push(`/hotel/${hotel.id}`)}
                variant='outline'>
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
