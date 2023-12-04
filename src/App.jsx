import { useEffect, useState } from "react";
import { locale, loadMessages } from "devextreme/localization";
import ruMessages from "devextreme/localization/messages/ru.json";
import Gallery from "devextreme-react/gallery";
import "./App.css";
import { SessionTemplate } from "./components/SessionTemplate";
import "devextreme/dist/css/dx.material.blue.dark.compact.css";
import mockData from "./mockData.json";
import { Template } from "devextreme-react/core/template";

function App() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // setData(mockData);
    let sessionparams = [];
    fetch('/pkis/jsoninf/get/user/getssv_kf?data={%22t_nach%22:%222023-12-04T10:10:20%22,%22t_konc%22:%222023-12-05T23:10:10%22}')
        .then(response => response.json())
        .then(data => {
            data.map((item) => {
              item?.sessionparams.map?.((sessionItem) => {
                sessionparams.push({
                  oid_id: item?.oid_id,
                  num_wp: item?.num_wp,
                  ...sessionItem,
                });
              });
            });
            console.log(sessionparams)
            setData(sessionparams);
            loadMessages(ruMessages);
            locale("ru");
        })
        .catch(error => console.error(error));

  }, []);

  return (
    <div style={{ backgroundColor: "gray", height: "100%", width: "100%" }}>
      <div className="dx-theme-background-color">
        <Gallery
          id="gallery"
          dataSource={data}
          height={100}
          loop={true}
          showNavButtons={true}
          showIndicator={true}
          noDataText={"Нет данных"}
          onSelectedIndexChange={(e) => {
            setSelectedIndex(e);

          }}
          width={"100%"}
          itemComponent={({ data, index }) => {
            return (
              <SessionTemplate
                data={data}
                index={index}
                selectedIndex={selectedIndex}
              />
            );
          }}
        />
        {/* <Template name="test" >
        <SessionTemplate/>
        </Template> */}
      </div>
    </div>
  );
}

export default App;
