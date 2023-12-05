import { useEffect, useMemo, useState, useRef } from "react";
import { locale, loadMessages } from "devextreme/localization";
import ruMessages from "devextreme/localization/messages/ru.json";
import Gallery from "devextreme-react/gallery";
import "./App.css";
import { SessionTemplate } from "./components/SessionTemplate";
import "devextreme/dist/css/dx.material.blue.dark.compact.css";
import { formatISO, parseISO } from "date-fns";
import { LoadPanel } from "devextreme-react/load-panel";
import { CheckBox } from "devextreme-react/check-box";

function App() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const timerId = useRef(null);
  const galleryRef = useRef(null);
  const loadPanelTarget = useMemo(() => {
    return { of: "#target" };
  }, []);

  useEffect(() => {
    loadMessages(ruMessages);
    locale("ru");
    let sessionparams = [];
    let prevDate = new Date();
    let nextDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    nextDate.setDate(nextDate.getDate() + 1);
    setShowIndicator(true);
    fetch(
      `/pkis/jsoninf/get/user/getssv_kf?data={%22t_nach%22:%22${formatISO(
        prevDate
      ).slice(0, -6)}%22,%22t_konc%22:%22${formatISO(nextDate).slice(
        0,
        -6
      )}%22}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          item?.sessionparams.map?.((sessionItem) => {
            sessionparams.push({
              oid_id: item?.oid_id,
              num_wp: item?.num_wp,
              ...sessionItem,
            });
          });
        });
        return sessionparams;
      })
      .then((response) => {
        const sortedData = response.sort((a, b) => {
            if (parseISO(a.rec_session_beg1) < parseISO(b.rec_session_beg1)) {
              return -1;
            } else if (
              parseISO(a.rec_session_beg1) > parseISO(b.rec_session_beg1)
            ) {
              return 1;
            } else {
              return 0;
            }
          })
          setData(sortedData);
          setShowIndicator(false);
        }
      )
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (autoScroll && data.length) {
      timerId.current = setInterval(() => {
        const firstNearestSessionId = data.findIndex(({ rec_session_beg1 }) => {
          return parseISO(rec_session_beg1) > new Date();
        });
        if (firstNearestSessionId > -1) {
          galleryRef.current?.instance.goToItem?.(firstNearestSessionId, true);
        }
      }, 2000);
    } else {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [autoScroll, data]);

  return (
    <div style={{ backgroundColor: "gray", height: "100%", width: "100%" }}>
      <div
        className="sessionBlock dx-theme-background-color dx-theme-accent-as-border-color"
        id="target"
      >
        <div className="settingsBlock dx-theme-border-color">
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Настройки</div>
            <div
              style={{
                width: "20%",
              }}
              className="dx-field"
            >
              <div
                style={{
                  width: "80%",
                }}
                className="dx-field-label"
              >
                Переключать на ближайший сброс
              </div>
              <div className="dx-field-value">
                <CheckBox
                  value={autoScroll}
                  onValueChanged={({ value }) => {
                    setAutoScroll(() => {
                      return value;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          position={loadPanelTarget}
          showIndicator={showIndicator}
          visible={showIndicator}
        />
        <Gallery
          id="gallery"
          ref={galleryRef}
          dataSource={data}
          height={100}
          loop={true}
          showNavButtons={!autoScroll}
          showIndicator={true}
          noDataText={"Нет данных"}
          onOptionChanged={({name}) => {
            console.log(name);
            if ( name === "selectedItemKeys") {
              console.log("onSelectedIndexChange")
            }
          }}
  
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
      </div>
    </div>
  );
}

export default App;
