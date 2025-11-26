
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const DateTimePicker = ({ label = "Select Date & Time", value = null, onChange }) => {
  const initial = value ? dayjs(value) : dayjs();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initial);
  const [temp, setTemp] = useState(initial);
  const [viewDate, setViewDate] = useState(initial);
  const [step, setStep] = useState("calendar");
  const ref = useRef(null);

  useEffect(() => {
    setSelected(initial);
    setTemp(initial);
    setViewDate(initial);
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const daysInMonth = viewDate.daysInMonth();
  const startDay = viewDate.startOf("month").day();
  const calendarArray = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const clockRadius = 85;
  const getClockPos = (i, total) => {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    return {
      left: `${clockRadius + clockRadius * Math.cos(angle)}px`,
      top: `${clockRadius + clockRadius * Math.sin(angle)}px`,
      transform: "translate(-50%,-50%)",
    };
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const openPicker = () => {
    setTemp(selected);
    setViewDate(selected);
    setStep("calendar");
    setOpen(true);
  };

  const onDayClick = (d) => {
    setTemp(temp.date(d));
    setStep("hour");
  };
  const onHourClick = (h) => {
    const updated = temp.hour(h === 12 ? 0 : h);
    setTemp(updated);
    setStep("minute");
  };
  const onMinuteClick = (m) => setTemp(temp.minute(m));

  const handleReset = () => {
    const now = dayjs();
    setTemp(now);
    setSelected(now);
    onChange?.(now);
  };
  const handleCancel = () => {
    setTemp(selected);
    setOpen(false);
  };
  const handleOk = () => {
    setSelected(temp);
    setOpen(false);
    onChange?.(temp);
  };

  return (
    <div className="relative w-full max-w-sm" ref={ref}>
      {label && <label className="block mb-1 text-gray-700 font-medium">{label}</label>}

      {/* Input */}
      <div
        onClick={openPicker}
        className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2 cursor-pointer hover:border-[#006633] focus-within:border-[#006633] transition-all duration-200 bg-white shadow-sm"
      >
        <span className="text-gray-700">{selected.format("MMM D, YYYY h:mm A")}</span>
        <Calendar className="w-5 h-5 text-[#006633]" />
      </div>

      {/* Popup */}
      {open && (
        <div className="absolute left-0 top-14 w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-5 z-50 animate-fadeIn border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#006633] to-[#00A859] text-white rounded-xl px-4 py-3 mb-4 shadow-md">
            <button
              onClick={() => setViewDate(viewDate.subtract(1, "month"))}
              className="hover:text-gray-100"
            >
              <ChevronLeft />
            </button>
            <div className="font-medium text-lg">{viewDate.format("MMMM YYYY")}</div>
            <button
              onClick={() => setViewDate(viewDate.add(1, "month"))}
              className="hover:text-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Calendar */}
          {step === "calendar" && (
            <>
              <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 text-center mb-5">
                {calendarArray.map((d, idx) =>
                  d ? (
                    <button
                      key={idx}
                      onClick={() => onDayClick(d)}
                      className={`py-2 rounded-full text-sm transition-all duration-150 ${
                        temp.date() === d && temp.month() === viewDate.month()
                          ? "bg-[#006633] text-white scale-105 shadow-sm"
                          : "text-gray-700 hover:bg-[#E1F6E5]"
                      }`}
                    >
                      {d}
                    </button>
                  ) : (
                    <div key={idx} />
                  )
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-[#006633]" />
                <button
                  className="text-[#006633] font-medium hover:underline"
                  onClick={() => setStep("hour")}
                >
                  {temp.format("hh:mm A")}
                </button>
              </div>
            </>
          )}

        {/* Hour Picker */}
{step === "hour" && (
  <div className="flex flex-col items-center">
    <div
      className="relative flex items-center justify-center rounded-full shadow-inner transition-all duration-300"
      style={{
        width: `${2 * clockRadius}px`,
        height: `${2 * clockRadius}px`,
        background: "radial-gradient(circle at center, #E9F8EE 0%, #CDEED7 100%)",
        border: "3px solid #88D199",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05), 0 2px 10px rgba(0,128,0,0.15)",
      }}
    >
      {/* Needle */}
      <div
        className="absolute bg-[#006633] origin-bottom rounded-full transition-transform duration-500 ease-in-out"
        style={{
          width: "2.5px",
          height: `${clockRadius - 18}px`,
          transform: `translateX(-50%) rotate(${(temp.hour() % 12) * 30}deg)`,
          left: "50%",
          bottom: `${clockRadius}px`,
        }}
      />

      {/* Center Hub */}
      <div className="absolute w-3 h-3 bg-[#006633] rounded-full shadow-md"></div>

      {hours.map((h, i) => {
        const pos = getClockPos(i, 12);
        const active = temp.hour() % 12 === (h === 12 ? 0 : h);
        return (
          <button
            key={h}
            onClick={() => onHourClick(h)}
            className={`absolute w-9 h-9 rounded-full text-sm flex items-center justify-center font-semibold transition-all duration-200 ${
              active
                ? "bg-[#006633] text-white scale-110 shadow-md"
                : "text-gray-700 hover:bg-[#C9EED4] hover:scale-105"
            }`}
            style={pos}
          >
            {h}
          </button>
        );
      })}
    </div>

    <div className="flex items-center gap-3 mt-3">
      <button
        className="text-gray-600 hover:underline"
        onClick={() => setStep("calendar")}
      >
        Back
      </button>
      <span className="text-lg font-semibold text-[#006633]">
        {temp.format("hh:mm A")}
      </span>
    </div>
  </div>
)}

{/* Minute Picker */}
{step === "minute" && (
  <div className="flex flex-col items-center">
    <div
      className="relative flex items-center justify-center rounded-full shadow-inner transition-all duration-300"
      style={{
        width: `${2 * clockRadius}px`,
        height: `${2 * clockRadius}px`,
        background: "radial-gradient(circle at center, #E9F8EE 0%, #CDEED7 100%)",
        border: "3px solid #88D199",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05), 0 2px 10px rgba(0,128,0,0.15)",
      }}
    >
      <div
        className="absolute bg-[#006633] origin-bottom rounded-full transition-transform duration-500 ease-in-out"
        style={{
          width: "2.5px",
          height: `${clockRadius - 18}px`,
          transform: `translateX(-50%) rotate(${temp.minute() * 6}deg)`,
          left: "50%",
          bottom: `${clockRadius}px`,
        }}
      />

      <div className="absolute w-3 h-3 bg-[#006633] rounded-full shadow-md"></div>

      {minutes.map((m, i) => {
        const pos = getClockPos(i, 12);
        const active = Math.round(temp.minute() / 5) * 5 === m;
        return (
          <button
            key={m}
            onClick={() => onMinuteClick(m)}
            className={`absolute w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
              active
                ? "bg-[#006633] text-white scale-110 shadow-md"
                : "text-gray-700 hover:bg-[#C9EED4] hover:scale-105"
            }`}
            style={pos}
          >
            {m.toString().padStart(2, "0")}
          </button>
        );
      })}
    </div>

    <div className="flex items-center gap-3 mt-3">
      <button
        className="text-gray-600 hover:underline"
        onClick={() => setStep("hour")}
      >
        Back
      </button>
      <span className="text-lg font-semibold text-[#006633]">
        {temp.format("hh:mm A")}
      </span>
    </div>
  </div>
)}


          {/* Footer */}
          <div className="flex justify-between mt-6 border-t pt-3">
            <button className="text-gray-600 hover:underline" onClick={handleReset}>
              Reset
            </button>
            <div className="flex gap-3">
              <button className="text-gray-600 hover:underline" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="bg-[#006633] text-white px-5 py-2 rounded-lg hover:bg-[#007A3D] transition-all shadow-sm"
                onClick={handleOk}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;

// import React, { useEffect, useRef, useState } from "react";
// import dayjs from "dayjs";
// import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// const DateTimePicker = ({ label = "Select Date & Time", value = null, onChange }) => {
//   const initial = value ? dayjs(value) : dayjs();
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(initial);
//   const [temp, setTemp] = useState(initial);
//   const [viewDate, setViewDate] = useState(initial);
//   const ref = useRef(null);

//   useEffect(() => {
//     setSelected(initial);
//     setTemp(initial);
//     setViewDate(initial);
//   }, [value]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const daysInMonth = viewDate.daysInMonth();
//   const startDay = viewDate.startOf("month").day();
//   const calendarArray = [
//     ...Array(startDay).fill(null),
//     ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
//   ];

//   const handleDayClick = (d) => {
//     setTemp(temp.date(d));
//   };

//   const handleTimeChange = (type, val) => {
//     let updated = temp;
//     if (type === "hour") {
//       const hour = parseInt(val, 10);
//       const isPM = temp.format("A") === "PM";
//       updated = updated.hour(isPM ? (hour % 12) + 12 : hour % 12);
//     } else if (type === "minute") {
//       updated = updated.minute(parseInt(val, 10));
//     } else if (type === "ampm") {
//       const hour = temp.hour();
//       updated = val === "PM" ? updated.hour((hour % 12) + 12) : updated.hour(hour % 12);
//     }
//     setTemp(updated);
//   };

//   const handleReset = () => {
//     const now = dayjs();
//     setTemp(now);
//     setSelected(now);
//     onChange?.(now);
//   };

//   const handleCancel = () => {
//     setTemp(selected);
//     setOpen(false);
//   };

//   const handleOk = () => {
//     setSelected(temp);
//     setOpen(false);
//     onChange?.(temp);
//   };

//   const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
//   const minutes = Array.from({ length: 60 }, (_, i) => i);

//   return (
//     <div className="relative w-full max-w-sm  ${className}" ref={ref}>
//       {label && (
//         <label className="block mb-1 font-medium text-[color:var(--text-main)]">
//           {label}
//         </label>
//       )}

//       {/* Input Field */}
//       <div
//         onClick={() => setOpen(true)}
//         className="flex items-center justify-between border border-[color:var(--border)] rounded-xl px-3 py-2 cursor-pointer bg-[color:var(--surface)] hover:border-[color:var(--primary)] transition-all duration-200 shadow-sm"
//       >
//         <span className="text-[color:var(--text-main)]">
//           {selected.format("MMM D, YYYY h:mm A")}
//         </span>
//         <Calendar className="w-5 h-5 text-[color:var(--primary)]" />
//       </div>

//       {/* Popup */}
//       {open && (
//         <div className="absolute left-0 top-14 w-full bg-[color:var(--surface)] shadow-2xl rounded-2xl p-5 z-50 border border-[color:var(--border)] animate-scaleIn">
//           {/* Header */}
//           <div className="flex items-center justify-between bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-light)] text-white rounded-xl px-4 py-3 mb-4 shadow">
//             <button
//               onClick={() => setViewDate(viewDate.subtract(1, "month"))}
//               className="hover:text-gray-100 transition"
//             >
//               <ChevronLeft />
//             </button>
//             <div className="font-semibold text-lg tracking-wide">
//               {viewDate.format("MMMM YYYY")}
//             </div>
//             <button
//               onClick={() => setViewDate(viewDate.add(1, "month"))}
//               className="hover:text-gray-100 transition"
//             >
//               <ChevronRight />
//             </button>
//           </div>

//           {/* Calendar */}
//           <div className="grid grid-cols-7 text-center text-sm font-semibold text-[color:var(--text-muted)] mb-2">
//             {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
//               <div key={d}>{d}</div>
//             ))}
//           </div>

//           <div className="grid grid-cols-7 gap-2 text-center mb-5">
//             {calendarArray.map((d, idx) =>
//               d ? (
//                 <button
//                   key={idx}
//                   onClick={() => handleDayClick(d)}
//                   className={`py-2 rounded-full text-sm transition-all duration-150 ${
//                     temp.date() === d && temp.month() === viewDate.month()
//                       ? "bg-[color:var(--primary)] text-white scale-105 shadow-sm"
//                       : "text-[color:var(--text-main)] hover:bg-[color:var(--surface-alt)]"
//                   }`}
//                 >
//                   {d}
//                 </button>
//               ) : (
//                 <div key={idx} />
//               )
//             )}
//           </div>

//           {/* Time Picker */}
//           <div className="grid grid-cols-3 gap-2 mt-2">
//             <select
//               value={temp.format("h")}
//               onChange={(e) => handleTimeChange("hour", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 text-[color:var(--text-main)] focus:border-[color:var(--primary)] focus:outline-none bg-[color:var(--surface)]"
//             >
//               {hours.map((h) => (
//                 <option key={h} value={h}>
//                   {h.toString().padStart(2, "0")}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={temp.minute()}
//               onChange={(e) => handleTimeChange("minute", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 text-[color:var(--text-main)] focus:border-[color:var(--primary)] focus:outline-none bg-[color:var(--surface)]"
//             >
//               {minutes.map((m) => (
//                 <option key={m} value={m}>
//                   {m.toString().padStart(2, "0")}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={temp.format("A")}
//               onChange={(e) => handleTimeChange("ampm", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 text-[color:var(--text-main)] focus:border-[color:var(--primary)] focus:outline-none bg-[color:var(--surface)]"
//             >
//               <option value="AM">AM</option>
//               <option value="PM">PM</option>
//             </select>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-between mt-6 border-t pt-3 text-sm">
//             <button
//               className="text-[color:var(--text-muted)] hover:underline"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//             <div className="flex gap-3">
//               <button
//                 className="text-[color:var(--text-muted)] hover:underline"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-[color:var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[color:var(--primary-dark)] transition-all shadow-sm"
//                 onClick={handleOk}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateTimePicker;






// import React, { useEffect, useRef, useState } from "react";
// import dayjs from "dayjs";
// import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// const DateTimePicker = ({ label = "Select Date & Time", value, onChange }) => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(value ? dayjs(value) : dayjs());
//   const [temp, setTemp] = useState(selected);
//   const [viewDate, setViewDate] = useState(selected);
//   const ref = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => !ref.current?.contains(e.target) && setOpen(false);
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const d = value ? dayjs(value) : dayjs();
//     setSelected(d);
//     setTemp(d);
//     setViewDate(d);
//   }, [value]);

//   const daysInMonth = viewDate.daysInMonth();
//   const startDay = viewDate.startOf("month").day();
//   const calendar = [...Array(startDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

//   const updateTime = (type, val) => {
//     let t = temp;
//     if (type === "hour") {
//       const hour = parseInt(val);
//       const isPM = t.format("A") === "PM";
//       t = t.hour(isPM ? (hour % 12) + 12 : hour % 12);
//     } else if (type === "minute") t = t.minute(parseInt(val));
//     else if (type === "ampm") t = val === "PM" ? t.hour((t.hour() % 12) + 12) : t.hour(t.hour() % 12);
//     setTemp(t);
//   };

//   const handleOk = () => {
//     setSelected(temp);
//     setOpen(false);
//     onChange?.(temp);
//   };

//   const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
//   const minutes = Array.from({ length: 60 }, (_, i) => i);

//   return (
//     <div className="relative w-full max-w-sm" ref={ref}>
//       {label && <label className="block mb-1 font-medium text-[color:var(--text-main)]">{label}</label>}

//       <div
//         onClick={() => setOpen(true)}
//         className="flex items-center justify-between border border-[color:var(--border)] rounded-xl px-3 py-2 cursor-pointer bg-[color:var(--surface)] hover:border-[color:var(--primary)] transition-all duration-200 shadow-sm"
//       >
//         <span>{selected.format("MMM D, YYYY h:mm A")}</span>
//         <Calendar className="w-5 h-5 text-[color:var(--primary)]" />
//       </div>

//       {open && (
//         <div className="absolute left-0 top-14 w-full bg-[color:var(--surface)] shadow-2xl rounded-2xl p-5 z-50 border border-[color:var(--border)] animate-scaleIn">
//           {/* Header */}
//           <div className="flex items-center justify-between bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary-light)] text-white rounded-xl px-4 py-3 mb-4 shadow">
//             <ChevronLeft onClick={() => setViewDate(viewDate.subtract(1, "month"))} className="cursor-pointer" />
//             <div className="font-semibold text-lg">{viewDate.format("MMMM YYYY")}</div>
//             <ChevronRight onClick={() => setViewDate(viewDate.add(1, "month"))} className="cursor-pointer" />
//           </div>

//           {/* Calendar */}
//           <div className="grid grid-cols-7 text-center text-sm font-semibold text-[color:var(--text-muted)] mb-2">
//   {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//     <div key={d + i}>{d}</div>
//   ))}
// </div>

//           <div className="grid grid-cols-7 gap-2 text-center mb-5">
//             {calendar.map((d, i) =>
//               d ? (
//                 <button
//                   key={i}
//                   onClick={() => setTemp(temp.date(d))}
//                   className={`py-2 rounded-full text-sm ${
//                     temp.date() === d && temp.month() === viewDate.month()
//                       ? "bg-[color:var(--primary)] text-white scale-105 shadow-sm"
//                       : "hover:bg-[color:var(--surface-alt)] text-[color:var(--text-main)]"
//                   }`}
//                 >
//                   {d}
//                 </button>
//               ) : (
//                 <div key={i} />
//               )
//             )}
//           </div>

//           {/* Time Picker */}
//           <div className="grid grid-cols-3 gap-2">
//             <select
//               value={temp.format("h")}
//               onChange={(e) => updateTime("hour", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 bg-[color:var(--surface)] focus:border-[color:var(--primary)] focus:outline-none"
//             >
//               {hours.map((h) => (
//                 <option key={h}>{h.toString().padStart(2, "0")}</option>
//               ))}
//             </select>
//             <select
//               value={temp.minute()}
//               onChange={(e) => updateTime("minute", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 bg-[color:var(--surface)] focus:border-[color:var(--primary)] focus:outline-none"
//             >
//               {minutes.map((m) => (
//                 <option key={m}>{m.toString().padStart(2, "0")}</option>
//               ))}
//             </select>
//             <select
//               value={temp.format("A")}
//               onChange={(e) => updateTime("ampm", e.target.value)}
//               className="border border-[color:var(--border)] rounded-lg px-3 py-2 bg-[color:var(--surface)] focus:border-[color:var(--primary)] focus:outline-none"
//             >
//               <option>AM</option>
//               <option>PM</option>
//             </select>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-between mt-6 border-t pt-3 text-sm">
//             <button onClick={() => setTemp(dayjs())} className="text-[color:var(--text-muted)] hover:underline">
//               Reset
//             </button>
//             <div className="flex gap-3">
//               <button onClick={() => setOpen(false)} className="text-[color:var(--text-muted)] hover:underline">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleOk}
//                 className="bg-[color:var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[color:var(--primary-dark)] shadow-sm"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateTimePicker;
