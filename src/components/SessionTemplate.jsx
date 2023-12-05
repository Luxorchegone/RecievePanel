import { useEffect, useRef, useState } from "react";
import { format, parseISO, intervalToDuration } from "date-fns";
import { ru } from "date-fns/locale";

export const SessionTemplate = ({
  data: { rec_session_beg1, cycle_num, shotparams },
  index,
  selectedIndex,
}) => {
  const timer = useRef(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const calculateAndSetRemainingTime = () => {
    setRemainingTime(() =>
      intervalToDuration({
        start: new Date(),
        end: parseISO(rec_session_beg1),
      })
    );
  };

  useEffect(() => {
    if (index == selectedIndex) {
      //проверяем, что мы находимся на "выбранном" сеансе

      if (parseISO(rec_session_beg1) > new Date()) {
        // что бы отсчет начинался сразу после загрузки страницы, делаем инит оставшегося времени
        if (timer.current == null) {
          calculateAndSetRemainingTime();
        }
        //пересчитываем оставшееся время
        timer.current = setInterval(() => {
          calculateAndSetRemainingTime();
        }, 2000);
      } else {
        //если время истекло и таймер id существует, то чистим таймер
        if (timer.current) {
          clearTimeout(timer.current);
          setRemainingTime(null)
        }
      }
    }

    return () => {
      //если размонтируемся и таймер id существует, то чистим таймер
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
          {`Сеанс через: ${remainingTime.days} д. ${remainingTime.hours} ч. ${remainingTime.minutes} мин. ${remainingTime.seconds} сек.`}
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
