import React from "react";

import SideBar from "./SideBar";

const AdminPage = () => {
  return (
    <div style={{ height: "80vh" }}>
      <section className="hero">
        <div className="container">
          <div className="row">
            <SideBar />
            <div className="col-lg-9">Hello</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
