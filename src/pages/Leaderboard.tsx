import { useEffect, useState } from "react";
import { getTopMemes, getMemes } from "../services/api";
import { Meme, User } from "../types";
import { useAppSelector } from "../hooks/useRedux";

const LeaderboardPage = () => {
  const [topMemes, setTopMemes] = useState<Meme[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const memes = await getTopMemes(10);
        setTopMemes(memes);

        const allMemes = await getMemes("All", 1, 1000, "likes");

        const userEngagement: Record<
          string,
          { user: User; likes: number; memes: number }
        > = {};
        allMemes.memes.forEach((meme) => {
          if (!meme.author) return;

          if (!userEngagement[meme.author]) {
            userEngagement[meme.author] = {
              user: {
                id: meme.author,
                name: meme.author,
                uploadedMemes: [],
                likedMemes: [],
                bio: "",
                profilePicture: "",
              },
              likes: 0,
              memes: 0,
            };
          }
          userEngagement[meme.author].memes += 1;

          userEngagement[meme.author].likes += meme.likes;
        });

        const sortedUsers = Object.values(userEngagement)
          .sort((a, b) => b.likes + b.memes - (a.likes + a.memes))
          .map((entry) => entry.user);

        setTopUsers(sortedUsers.slice(0, 10));
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  console.log("Top users : ", topUsers);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-purple-50 to-pink-50"
        }`}
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-[#0e1217]"
          : "bg-gradient-to-br from-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Top 10 Most Liked Memes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMemes.map((meme, index) => (
              <div
                key={meme.id}
                className={`hover:scale-110 hover:transition duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg hover:shadow-xl   transition-shadow ${
                  darkMode
                    ? "bg-[#1c1f26]"
                    : "bg-white border border-purple-500 "
                }`}
              >
                <img
                  src={meme.url}
                  alt={meme.title}
                  className="w-full h-48 object-cover rounded-tl rounded-tr rounded-l mb-4"
                />
                <div
                  className={`${
                    darkMode
                      ? ""
                      : "bg-gradient-to-r from-purple-500 to-pink-500 "
                  } space-y-2 px-2 pb-4`}
                >
                  <h3 className="text-xl font-bold text-purple-400">
                    {meme.title}
                  </h3>
                  <p className="text-gray-400">Likes: {meme.likes}</p>
                  <p className="text-gray-400">
                    Author: {meme.author || "Unknown"}
                  </p>
                  <div className="text-sm text-gray-400">
                    Rank:{" "}
                    <span className="font-bold text-purple-500">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
