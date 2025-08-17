import { Clock, MapPin } from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "WORLD BLOOD DONORS DAY",
    date: "14 JUNE, 2017",
    description:
      "Every year, on 14 June, countries around the world celebrate World Blood Donor Day. The event serves to thank voluntary.",
    time: "10.00am - 3.00pm",
    location: "California, USA",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "O- BLOOD DONORS NEEDED",
    date: "20 SEP, 2017",
    description:
      "O Negative blood cells are called 'universal' meaning they can be transfused to almost any patient in need and blood cells are safest.",
    time: "10.00am - 3.00pm",
    location: "California, USA",
    image: "https://img.pikbest.com/origin/06/40/19/05UpIkbEsTcpW.jpg!w700wp",
  },
  {
    id: 3,
    title: "YOU ARE SOMEBODY’S TYPE",
    date: "20 SEP, 2017",
    description:
      "Many people have same blood group like you. So donate now and bring smiles in their face and encourage others for donate blood.",
    time: "10.00am - 3.00pm",
    location: "California, USA",
    image: "https://img.pikbest.com/origin/06/40/14/00gpIkbEsTNVh.jpg!w700wp",
  },
  {
    id: 4,
    title: "DONATION - FEEL REAL PEACE",
    date: "20 SEP, 2017",
    description:
      "You're the real hero because you can gift a new life for patient. So donate your blood and enjoy a precious life. Don't fear, it's really easy.",
    time: "10.00am - 3.00pm",
    location: "California, USA",
    image:
      "https://media.post.rvohealth.io/wp-content/uploads/2020/09/732x549_Side_Effects_of_Donating_Plasma-1-732x549.jpg",
  },
];

export default function Campaigns() {
    return (
      <>
        <div className="mx-auto mb-8 h-96 text-center flex flex-col justify-center items-center mt-28 bg-[url(https://www.shutterstock.com/image-vector/world-donor-day-abstract-wallpaper-600nw-2115749144.jpg)] bg-cover bg-center">
          <h1 className="text-3xl md:text-5xl font-bold text-red-600 ">
            Join Our Life-Saving Campaign
          </h1>
          <p className="mt-4 text-black max-w-2xl mx-auto">
            Every drop of blood can save a life. Become a part of our campaign
            to support patients in need. Together, we can build a stronger and
            healthier community by donating blood and spreading awareness.
          </p>
          {/* <img
            src="https://t3.ftcdn.net/jpg/01/37/30/90/360_F_137309034_4oK5BoYqUc7sUoNor1ltGW0PAYNzExK9.jpg"
            alt=""
            className=" w-full h-96 object-cover rounded-lg shadow-lg"
          /> */}
        </div>
        <div className="py-12 px-4 max-w-7xl mx-auto dark:bg-gray-900">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 dark:text-white">
            DONATION CAMPAIGNS
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Campaigns to encourage new donors to join and existing donors to
            continue to give blood.
          </p> */}

          <div className="grid gap-8 md:grid-cols-2">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-gray-800 dark:bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded">
                    {c.date}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-red-600 dark:text-red-400">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {c.description}
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-4 gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {c.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {c.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}
