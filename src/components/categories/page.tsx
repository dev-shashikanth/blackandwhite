import React from "react";

interface categoryListProps {}

interface categoryCardProps {
  name: string;
  image: string;
}

const CategoryCard = ({ name, image }: categoryCardProps) => {
  return <div>CategoryCard</div>;
};
const page = () => {
  return <div>page</div>;
};

export default page;
