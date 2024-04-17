import "./style.scss";
import { Footer } from "../../Widgets/index";
import { masterApi } from "../../Entities/Master/api/service";
import { useEffect } from "react";

export const Layout = ({ children }) => {
  const [deletePreviousDates, {}] = masterApi.useDeletePreviousDatesMutation();
  useEffect(() => {
    deletePreviousDates();
  }, []);
  return (
    <div className="Layout-container">
      <div className="Layout-width">
        {children}
        <Footer />
      </div>
    </div>
  );
};
