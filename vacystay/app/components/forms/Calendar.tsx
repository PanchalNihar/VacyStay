"use client";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
interface DatePickerPropes {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDate?: Date[];
}
const DatePicker: React.FC<DatePickerPropes> = ({
  value,
  onChange,
  bookedDate,
}) => {
  return (
    <DateRange
      className="w-full boeder-gray-400 rounded-xl mb-4"
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDate}
    ></DateRange>
  );
};
export default DatePicker;
