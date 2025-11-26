// import React from "react";
// import ReactSpeedometer from "react-d3-speedometer";

// const Meter = ({
//   value = 0,
//   width = 260,
//   height = 180,
//   maxValue,
//   title = "",
// }) => {
//   const safeValue = !isNaN(value) ? value : 0;

//   const dynamicMax =
//     maxValue ? maxValue : safeValue > 1000 ? 50000 : 10000;

//   return (
//     <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-5 w-fit">

//       {title && (
//         <h2 className="text-lg font-semibold text-gray-700 mb-3">
//           {title}
//         </h2>
//       )}

//       <ReactSpeedometer
//         width={width}
//         height={height}
//         value={safeValue}
//         minValue={0}
//         maxValue={dynamicMax}
//         segments={5}
//         maxSegmentLabels={5}
//         needleHeightRatio={0.7}
//         needleColor="#1e293b"
//         forceRender={true}
//         needleTransition="easeElastic"
//         needleTransitionDuration={1500}
//         segmentColors={[
//           "#22c55e",
//           "#16a34a",
//           "#84cc16",
//           "#eab308",
//           "#dc2626",
//         ]}
//         currentValueText=""
//       />

//       <p className="mt-2 text-xl font-bold text-gray-800">
//         {safeValue.toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default Meter;
import React, { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

export default function ProGauge({ value, max = 10000, title }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 p-8 rounded-3xl w-full max-w-xl mx-auto">
      {/* Glassmorphic Title */}
      <h2 className="text-2xl font-bold text-gray-900 drop-shadow-sm mb-8 text-center tracking-wide">
        {title}
      </h2>

      <div className="flex justify-center relative">
        
        <GaugeComponent
          value={animatedValue}
          maxValue={max}
          type="semicircle"
          arc={{
            width: 0.22,
            padding: 0.02,
            cornerRadius: 6,

            // APPLE-STYLE GRADIENT ARC + SHADOW
            colorArray: [
              "rgba(14, 122, 13, 0.9)",
              "rgba(108, 194, 74, 1)",
            ],

            subArcs: [
              {
                limit: max * 0.5,
                color: "url(#appleGradient)",
                showTick: true,
              },
              {
                limit: max,
                color: "url(#appleGradient)",
                showTick: true,
              }
            ],
          }}
          pointer={{
            color: "#1a1a1a",
            length: 0.6,
            width: 12,
            // Smooth elastic-like motion
            elastic: true,

            // Needel glow shadow
            strokeLinecap: "round",
            style: {
              filter: "drop-shadow(0px 0px 8px rgba(0,255,0,0.8))",
            },
          }}
          labels={{
            valueLabel: {
              formatTextValue: (v) => `${v}`,
              style: {
                fontSize: "38px",
                fontWeight: "900",
                fill: "#0f172a",
              },
            },
            tickLabels: {
              type: "outer",
              ticks: [
                { value: 0 },
                { value: max * 0.25 },
                { value: max * 0.5 },
                { value: max * 0.75 },
                { value: max },
              ],
              style: {
                fontSize: "13px",
                fill: "#374151",
                fontWeight: "600",
              },
            },
          }}
          style={{
            width: "100%",
            height: "270px",
            filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
          }}
        />

        {/* SVG Gradient Defs */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E7A0D" />
              <stop offset="100%" stopColor="#6CC24A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
