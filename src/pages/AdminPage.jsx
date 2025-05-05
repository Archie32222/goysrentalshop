import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AdminHeader from "../components/AdminHeader";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(tabFromUrl || "users");

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/admin-login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          navigate("/"); // Redirect non-admins
        } else if (data) {
          setIsAdmin(true);
          fetchUsers();
          fetchBookings();
        } else {
          setIsAdmin(false);
          navigate("/"); // Redirect non-admins
        }
      } catch (err) {
        console.error("Error in admin check:", err);
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Using Supabase Auth Admin API would be better here, but for this demo
      // we'll use a users table that you would need to maintain separately
      const { data, error } = await supabase
        .from("profiles") // Assuming you have a profiles table for users
        .select("*");

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("book")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Delete a user (this would need proper security measures in a real app)
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  // Handle booking status change
  const handleBookingStatusChange = async (bookingId, status) => {
    try {
      const { error } = await supabase
        .from("book")
        .update({ status })
        .eq("id", bookingId);

      if (error) throw error;

      // Update the local state
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status");
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AdminHeader userName={user?.email} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-8">Admin Control Panel</h1>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-700">
            <button
              className={`py-2 px-4 ${
                activeTab === "users"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "bookings"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              Bookings
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "cars"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("cars")}
            >
              Vehicles
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "reports"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Registered Users</h2>
                <button
                  onClick={fetchUsers}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <p>Loading users...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-800">
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Joined</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700"
                          >
                            <td className="px-6 py-4">
                              {user.id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                              {user.full_name || "Not provided"}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-500 hover:text-red-400 mr-2"
                              >
                                Delete
                              </button>
                              <button className="text-blue-500 hover:text-blue-400">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Car Bookings</h2>
                <button
                  onClick={fetchBookings}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                >
                  Refresh
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-gray-800">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Car</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Dates</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700"
                        >
                          <td className="px-6 py-4">{booking.id}</td>
                          <td className="px-6 py-4">{booking.car_name}</td>
                          <td className="px-6 py-4">
                            <div>{booking.user_name}</div>
                            <div className="text-xs text-gray-400">
                              {booking.contact}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              From:{" "}
                              {new Date(
                                booking.start_date
                              ).toLocaleDateString()}
                            </div>
                            <div>
                              To:{" "}
                              {new Date(booking.end_date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">{booking.rate_price}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === "confirmed"
                                  ? "bg-green-900 text-green-300"
                                  : booking.status === "cancelled"
                                  ? "bg-red-900 text-red-300"
                                  : "bg-yellow-900 text-yellow-300"
                              }`}
                            >
                              {booking.status || "pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              className="bg-gray-700 text-white p-1 rounded mr-2"
                              value={booking.status || "pending"}
                              onChange={(e) =>
                                handleBookingStatusChange(
                                  booking.id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirm</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                            <button className="text-blue-500 hover:text-blue-400">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vehicles Tab (New) */}
          {activeTab === "cars" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Vehicle Management</h2>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                  Add New Vehicle
                </button>
              </div>
              <p className="text-gray-400">
                Vehicle management features coming soon...
              </p>
            </div>
          )}

          {/* Reports Tab (New) */}
          {activeTab === "reports" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Reports & Analytics</h2>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                  Generate Report
                </button>
              </div>
              <p className="text-gray-400">
                Reporting and analytics features coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
