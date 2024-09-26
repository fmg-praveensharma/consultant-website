"use client";
import FollowersCard from "@/components/followers/follower-card";
import { useGetMyFollowersQuery } from "@/store/services";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Follower {
  name: string;
  id: string;
  photo: string;
  dob: string;
}

const followers: Follower[] = [
  {
    name: "Emma Watson",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Emily Blunt",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Alex Martin",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Keira Knightley",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Kate Winslet",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Charlize Theron",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Judi Dench",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
  {
    name: "Alex Martin",
    id: "238392020",
    photo: "https://via.placeholder.com/150",
    dob: "March 15, 2024",
  },
];

export default function Followers() {
  const id: any = useSelector((state: RootState) => state.auth.user?.id);

  const {
    data: followers,
    isLoading,
    refetch,
    isFetching,
  } = useGetMyFollowersQuery({ id: id });

  // console.log("followers ----- list", followers1?.data?.follower);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Followers</h1>
        <div className="text-xl bg-gray-700 text-white px-4 py-2 rounded-full">
          {/* <span className="font-bold text-green-500">{followers.length}</span> */}
          Number of followers:{" "}
          <span className="font-bold text-green-500">
            {followers?.data?.follower?.length}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {followers?.data?.follower &&
          followers?.data?.follower.map((follower: any) => (
            <FollowersCard
              key={follower.id}
              name={follower.first_name}
              id={follower.id}
              photo={follower.photo_url}
              dob={follower.date_of_birth}
            />
          ))}
      </div>
    </div>
  );
}
