import { useEffect, useRef } from "react";
import { format, parseISO } from "date-fns";

export const SessionTemplate = ({ data, index, selectedIndex }) => {
  const timer = useRef(null);

  useEffect(() => {
    console.log(data);
    if ( index == selectedIndex ) {

    }
  }, []);

  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        padding: "0 60px",
      }}
      className="dx-theme-background-color"
    >
      <p
        style={{
          margin: 0,
          width: "20%",
        }}
      >
        {`Дата: ${format(parseISO(data.rec_session_beg1), "dd.MM.yyyy HH:mm:ss")}`}
      </p>
      <p
        style={{
          margin: 0,
          width: "35%",
        }}
      >
        {`Сеанс через: ${format(parseISO(data.rec_session_beg1), "dd.MM.yyyy")}`}
        {/* {format(
          data.remainingTime,
          "dd 'д.' HH 'ч.' mm 'мин.' ss 'сек.'"
        )} */}
      </p>
      <p
        style={{
          margin: 0,
          width: "25%",
        }}
      >
        {`Номер сброса: ${data.cycle_num}` }
      </p>
      <p
        style={{
          margin: 0,
          width: "20%",
        }}
      >{
        `Маршрутов: ${data.shotparams.length}`
      }
      </p>
    </div>
  );
};
