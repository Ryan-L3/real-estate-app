import React from "react";
import Image from "next/image";
import { BedDouble, MapPin } from "lucide-react";

function Listing({ listing }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap 5">
        {listing.map((item, index) => (
          <div>
            <Image
              src={item.ListingImages[0].url}
              width={800}
              height={150}
              classname="rounded-lg object-cover h-[150]"
            />
            <div className="flex mt-2 flex-col gap-2">
              <h2 className="font-bold text-xl">${item.price}</h2>
              <h2 className="flex gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                {item.address}
              </h2>
              <div>
                <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500">
                  <BedDouble />
                  {item?.bedroom}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;
