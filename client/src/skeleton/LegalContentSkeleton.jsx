import React from "react";
import Skeleton from "react-loading-skeleton";

const LegalContentSkeleton = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            {Array.from({ length: 16 }).map((item, index) => {
              return <Skeleton key={index} count={3} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalContentSkeleton;
