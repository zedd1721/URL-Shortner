import { useSelector } from "react-redux";
import UrlShortenerWithList from "../components/UrlShortenerWithList";

function Dashboard() {
  const userObj = useSelector((state) => state.auth.user);
  const user = userObj?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 pb-10">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto py-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2">
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
          Here you can shorten new URLs and manage all your short links in one
          place.
        </p>
      </div>
      <UrlShortenerWithList />
    </div>
  );
}

export default Dashboard;
