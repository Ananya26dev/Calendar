import React, { useState, useEffect } from "react";
import "./Calendar.css";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}
          &nbsp;&nbsp;
          {currentDate.getFullYear()}
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="day-names">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: startDay }).map((_, index) => (
          <div className="empty-day" key={index}></div>
        ))}

        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`day ${
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth()
                ? "today"
                : ""
            } 
                      ${
                        selectedDate &&
                        day.toDateString() === selectedDate.toDateString()
                          ? "selected"
                          : ""
                      }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
