import React from "react";
import "./CampusFacilities.scss";

// Auto import all images
const images = import.meta.glob("../../images/facilities/*.{jpg,jpeg,png,webp}", {
  eager: true,
  as: "url"
});

const CampusFacilities: React.FC = () => {

  const imageList = Object.values(images);

  return (
    <div className="facilities-page">

      <h1 className="page-title">Campus Facilities Gallery</h1>

      <div className="gallery-grid">
        {imageList.map((img: string, index: number) => (
          <div className="gallery-card" key={index}>
            <img src={img} alt={`Facility ${index + 1}`} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default CampusFacilities;
