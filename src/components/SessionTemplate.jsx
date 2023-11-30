import { useEffect } from "react";
import { format } from "date-fns";

export const SessionTemplate = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div
      key={props.index}
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        padding: '0 60px'
      }}
      className="dx-theme-background-color"
    >
      <p
        style={{
          margin: 0,
          width: "20%",
        }}
      >
        Дата: {format(props.data.date, 'dd.MM.yyyy')}
      </p>
      <p
        style={{
          margin: 0,
          width: "35%",
        }}
      >
        Сеанс через: {format(props.data.remainingTime, "dd 'д.' HH 'ч.' mm 'мин.' ss 'сек.'")}
      </p>
      <p
        style={{
          margin: 0,
          width: "25%",
        }}
      >
        Номер сброса: {props.data.recieveNumber}
      </p>
      <p
        style={{
          margin: 0,
          width: "20%",
        }}
      >
        Маршрутов: {props.data.quantityOfRoutes}
      </p>
    </div>
  );
};
