import React, { useState, useEffect } from "react";
import car1 from "../assets/images/Cars/car1.png";
import car2 from "../assets/images/Cars/car2.png";
import car3 from "../assets/images/Cars/car3.png";
import car4 from "../assets/images/Cars/car4.png";
import car5 from "../assets/images/Cars/car5.png";
import car6 from "../assets/images/Cars/car6.png";

import { insertBooking } from "../lib/supabase";
import HeaderNav from "../components/HeaderNav";
import LoggedInHeader from "../components/LoggedInHeader";
import { supabase } from "../lib/supabase";

const Booking = () => {
  const [user, setUser] = useState(null);
  const cars = [
    {
      id: 1,
      name: "Toyota Vios",
      price: "₱1,800 / day",
      features: [
        "✅ 5 Seater",
        "✅ Automatic Transmission",
        "✅ Air Conditioning",
      ],
      image: car1,
    },
    {
      id: 2,
      name: "Honda Civic",
      price: "₱2,200 / day",
      features: [
        "✅ 5 Seater",
        "✅ Automatic Transmission",
        "✅ Bluetooth Audio",
        "✅ Fuel Efficient",
      ],
      image: car2,
    },
    {
      id: 3,
      name: "Mitsubishi Montero",
      price: "₱3,500 / day",
      features: [
        "✅ 7 Seater",
        "✅ SUV",
        "✅ 4x4 Available",
        "✅ Spacious Interior",
      ],
      image: car3,
    },
    {
      id: 4,
      name: "Ford Ranger",
      price: "₱2,800 / day",
      features: [
        "✅ Pickup Truck",
        "✅ Diesel",
        "✅ High Ground Clearance",
        "✅ Heavy Duty",
      ],
      image: car4,
    },
    {
      id: 5,
      name: "Hyundai Accent",
      price: "₱1,700 / day",
      features: [
        "✅ 5 Seater",
        "✅ Fuel Efficient",
        "✅ Compact Size",
        "✅ Easy to Park",
      ],
      image: car5,
    },
    {
      id: 6,
      name: "Nissan Urvan",
      price: "₱3,800 / day",
      features: [
        "✅ 12 Seater",
        "✅ Van",
        "✅ Spacious Cargo Area",
        "✅ Ideal for Groups",
      ],
      image: car6,
    },
  ];

  const [formData, setFormData] = useState({});

  // Check for user session when component mounts
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    // Set up listener for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleChange = (carId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [carId]: {
        ...prev[carId],
        [field]: value,
      },
    }));
  };

  const handleBooking = async (e, car) => {
    e.preventDefault();
    const form = formData[car.id] || {};
    const payload = {
      car_name: car.name,
      user_name: form.user_name,
      contact: form.contact,
      start_date: form.start_date,
      end_date: form.end_date,
      rate_price: car.price,
    };

    const { data, error } = await insertBooking(payload);
    if (error) {
      alert("Failed to book: " + error);
    } else {
      alert(`Booking for ${car.name} successful!`);
      // Optionally reset the form
      setFormData((prev) => ({ ...prev, [car.id]: {} }));
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {user ? <LoggedInHeader userName={user.email} /> : <HeaderNav />}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-16">
        {cars.map((car) => (
          <div key={car.id} className="bg-gray-800 p-4 rounded-2xl shadow-lg">
            <img src={car.image} alt={car.name} className="rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold text-gray-300">{car.name}</h2>
            <p className="text-gray-300">{car.price}</p>
            <ul className="text-gray-400 text-sm mt-2 mb-4">
              {car.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <form className="space-y-3" onSubmit={(e) => handleBooking(e, car)}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                value={formData[car.id]?.user_name || ""}
                onChange={(e) =>
                  handleChange(car.id, "user_name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Contact"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                value={formData[car.id]?.contact || ""}
                onChange={(e) =>
                  handleChange(car.id, "contact", e.target.value)
                }
              />
              <input
                type="date"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                value={formData[car.id]?.start_date || ""}
                onChange={(e) =>
                  handleChange(car.id, "start_date", e.target.value)
                }
              />
              <input
                type="date"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                value={formData[car.id]?.end_date || ""}
                onChange={(e) =>
                  handleChange(car.id, "end_date", e.target.value)
                }
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold"
              >
                Book Now
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Booking;
