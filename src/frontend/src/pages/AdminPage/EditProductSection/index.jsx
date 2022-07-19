import React from "react";
import { useParams } from "react-router-dom";

const EditProductSection = () => {
  const { id } = useParams();
  return <div>EditProductSection {id}</div>;
};

export default EditProductSection;
