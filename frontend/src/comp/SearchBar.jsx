
import React from "react";
import { CgSearchFound } from "react-icons/cg";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="text-center mb-4">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input
          type="text"
          className="form-control2"
          style={{ maxWidth: "400px", borderRadius:"20px",  
            color: "white", backgroundColor: "rgb(41, 41, 41)",
        width:"600px"}}
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CgSearchFound size={28} style={{ marginLeft: "10px", color: "#444" }} />
      </div>
    </div>
  );
};

export default SearchBar;
