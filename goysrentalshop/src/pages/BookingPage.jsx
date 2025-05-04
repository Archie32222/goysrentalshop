import React, { useState } from 'react';
import car1 from '../assets/images/Cars/car1.png';
import logo from '../assets/images/Background/Goysrentalshop.jpg';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import { insertBooking } from '../lib/supabase';

    
    const Booking = () => {
      const cars = [
        {
          id: 1,
          name: 'Toyota Vios',
          price: '₱1,800 / day',
          features: ['✅ 5 Seater', '✅ Automatic Transmission', '✅ Air Conditioning'],
          image: car1,
        },
        // ... more cars
      ];
    
      const [formData, setFormData] = useState({});
    
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
          alert('Failed to book: ' + error);
        } else {
          alert(`Booking for ${car.name} successful!`);
          // Optionally reset the form
          setFormData((prev) => ({ ...prev, [car.id]: {} }));
        }
      };
    
      return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-16">
          {cars.map((car) => (
            <div key={car.id} className="bg-gray-800 p-4 rounded-2xl shadow-lg">
              <img src={car.image} alt={car.name} className="rounded-lg mb-4" />
              <h2 className="text-2xl font-semibold">{car.name}</h2>
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
                  value={formData[car.id]?.user_name || ''}
                  onChange={(e) => handleChange(car.id, 'user_name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Contact"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                  value={formData[car.id]?.contact || ''}
                  onChange={(e) => handleChange(car.id, 'contact', e.target.value)}
                />
                <input
                  type="date"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                  value={formData[car.id]?.start_date || ''}
                  onChange={(e) => handleChange(car.id, 'start_date', e.target.value)}
                />
                <input
                  type="date"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                  value={formData[car.id]?.end_date || ''}
                  onChange={(e) => handleChange(car.id, 'end_date', e.target.value)}
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
      );
    };
    
    export default Booking;
    