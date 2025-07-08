import React from "react";
import Marquee from "react-fast-marquee";
import LiveSaves from "./Marquee/LiveSaves";
import Support from "./Marquee/Support";
import ActiveDonner from "./Marquee/ActiveDonner";
import Campaigns from "./Marquee/Campaigns";
import Cities from "./Marquee/Cities";
import Donations from "./Marquee/Donations";

const Banner = () => {
  return (
    <div className="">
      <section className="">
        <div className="bg-[url(https://i.ibb.co/8n7jqYdF/world-blood-donor-day-creative-collage.jpg)] bg-no-repeat bg-cover min-h-screen w-full flex flex-col justify-center items-center">
          <div className="w-5xl text-center ">
            <h3 className="text-red-200 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold">
              Give Blood, Give Life
            </h3>
            <p className="text md:text-xl text-white mt-4">
              Every donation can save up to 3 lives. Join our community of{" "}
              <br />
              heroes today.
            </p>
            {/* marquee */}

            <div className="w-3xl mx-auto py-6 rounded-sm bg-sky-100">
              <Marquee>
                <div className=" flex gap-12">
                  <LiveSaves />
                  <Support />
                  <ActiveDonner />
                  <Campaigns />
                  <Cities />
                  <Donations />
                </div>
              </Marquee>
            </div>
            {/* became a donner */}
            <div>
              <button className="btn mt-12 mb-8 text-xl font-semibold px-6 py-8 rounded-4xl bg-red-500 text-white border-red-600 transition-transform duration-300 hover:scale-110">
                Became a Donor
              </button>
            </div>
            <button className="btn text-xl font-semibold px-6 py-8 rounded-4xl bg-yellow-500 text-white border-yellow-600 transition-transform duration-300 hover:scale-110">
              Find Donors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
