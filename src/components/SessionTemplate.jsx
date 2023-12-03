import { useEffect, useRef, useState } from "react";
import { format, parseISO, formatDistanceToNowStrict } from "date-fns";
import { ru } from "date-fns/locale";

export const SessionTemplate = ({
  data: { rec_session_beg1, cycle_num, shotparams },
  index,
  selectedIndex,
}) => {
  const timer = useRef(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // useEffect(() => {
  //   console.log(data);
  //   if (index == selectedIndex) {
  //     //проверяем, что мы находимся на "выбранном" сеансе

  //     const currentDate = new Date();
  //     //получаем
  //   }
  // }, []);

  useEffect(() => {
    if (index == selectedIndex) {
      //проверяем, что мы находимся на "выбранном" сеансе

      const currentDate = new Date();
      //получаем текущую дату

      if (parseISO(rec_session_beg1) > currentDate) {
        timer.current = setInterval(() => {
          setRemainingTime(() => parseISO(rec_session_beg1) - currentDate);
          console.log(
            typeof formatDistanceToNowStrict(parseISO(rec_session_beg1), {
              unit: "second",
              locale: ru,
            })
          );
        }, 2000);
      } else {
        if (timer.current) {
          clearTimeout(timer.current);
          console.log(`очищено`);
        }
      }
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  });

  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
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
        {`Дата: ${format(parseISO(rec_session_beg1), "dd.MM.yyyy HH:mm:ss")}`}
      </p>
      {remainingTime && (
        <p
          style={{
            margin: 0,
            width: "35%",
          }}
        >
          {`Сеанс через: ${format(
            remainingTime,
            "dd 'д.' HH 'ч.' mm 'мин.' ss 'сек.'"
          )}`}
        </p>
      )}
      <p
        style={{
          margin: 0,
          width: "25%",
        }}
      >
        {`Номер сброса: ${cycle_num}`}
      </p>
      <p
        style={{
          margin: 0,
          width: "20%",
        }}
      >
        {`Маршрутов: ${shotparams.length}`}
      </p>
    </div>
  );
};
