import "./style.scss";
import { serviceApi } from "../../Entities/Services/api/service";
import { useState, useEffect } from "react";
import { convertServicesObject } from "./lib/convertServicesObject";

function Services() {
  const { data: allServices, error } = serviceApi.useGetServicesQuery();
  const [services, setServices] = useState();

  useEffect(() => {
    setServices(convertServicesObject(allServices));
  }, [allServices]);

  const generateServicesFromObject = (data) => {
    return (
      <div style={{ width: "100%" }}>
        {data?.map((section, index) => (
          <div
            key={index}
            className={index !== 0 ? "Services-content-title__withMargin" : ""}
          >
            <h2 className="Services-content-title">
              0{index + 1}/ {section.title}
            </h2>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="Services-content">
                  <div className="Services-content-margin">
                    <div className="Services-content-item">
                      <p>{item.item}</p>
                    </div>
                    {item.description && (
                      <p className="Services-content-item__description">
                        {"("}
                        {item.description}
                        {")"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p>
                      {item.price}
                      {".-"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="Services-container" id="serviceSection">
      <div className="Service-title">
        <h1>// SERVICES</h1>
      </div>
      <div className="Service-content-wrapper">
        <div className="Services-content">
          {!!error ? (
            <div>Ошибка загрузки данных</div>
          ) : (
            generateServicesFromObject(services)
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
