import {
  CalendarDatum,
  DateOrString,
  ResponsiveTimeRange,
} from "@nivo/calendar";
import { useEffect, useState } from "react";

interface chartProps {
  data: CalendarDatum[];
  from: DateOrString | undefined;
  to: DateOrString | undefined;
}
export const MyResponsiveTimeRange = ({ data, from, to }: chartProps) => {
  const [fromDay, setFromDay] = useState(new Date());
  const [toDay, setToDay] = useState(new Date());
  const [day, setDay] = useState(new Date());

  const formatTime = (time: number) => {
    return `${`0${Math.floor(time / 3600)}`.slice(-2)}:${`0${
      Math.floor(time / 60) % 60
    }`.slice(-2)}:${`0${time % 60}`.slice(-2)}`;
  };

  useEffect(() => {
    const date = new Date();
    if (day.toLocaleDateString() !== date.toLocaleDateString()) {
      setDay(date);
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const month = new Date(now.setMonth(now.getMonth() - 1));
    setToDay(day);
    setFromDay(month);
  }, [day]);

  return (
    <ResponsiveTimeRange
      data={data}
      from={from}
      to={to}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      weekdayTicks={[]}
      tooltip={function (data) {
        if (data.value === undefined) return null;
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div
              style={{
                color: "black",
                backgroundColor: "#F4DEE0",
                padding: "10px",
                width: "fit-content",
                height: "fit-content",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: "gray",
                }}
              >
                {data.day}
              </div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                {formatTime(+data.value)}
              </div>
            </div>
          </div>
        );
      }}
      weekdayLegendOffset={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
};

export default MyResponsiveTimeRange;
