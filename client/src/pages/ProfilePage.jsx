import React from "react";
import Layout from "../components/layout/Layout";
import Profile from "./../components/user/Profile";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";

const ProfilePage = () => {
  return (
    <Layout>
      <ProfileSkeleton />
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
