import React from "react";
import { Button } from "@mui/material";

const Calendly: React.FC = () => {
  return (
    <div className="">
        <Button
          href="https://calendly.com/ascendstudios-art/30min"
          target="_blank"
          title="Book a Session"
          style={{ borderRadius: "8px" }}
        ></Button>
    </div>
  );
};

export default Calendly;