import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import styled from "styled-components";

const CustomTooltip = styled.div`
  background: #121212;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  border: 2px solid #ff79c6;
  font-family: 'Poppins', sans-serif;
`;

const TooltipText = styled.p`
  margin: 6px 0;
  font-weight: 500;
  color: #e6e6e6;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:before {
    content: "📊";
    margin-right: 10px;
    filter: drop-shadow(0 0 4px rgba(255, 121, 198, 0.4));
  }
`;

const TooltipMain = styled.h2`
  margin: 0 0 12px 0;
  font-weight: 700;
  color: #ff79c6;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  &:before {
    content: "✨";
    margin-right: 10px;
    filter: drop-shadow(0 0 6px rgba(189, 147, 249, 0.6));
  }
`;

const CustomTooltipContent = ({ active, payload, dataKey }) => {
    if (active && payload && payload.length) {
        const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;

        return (
            <CustomTooltip>
                {dataKey === "attendancePercentage" ? (
                    <>
                        <TooltipMain>{subject}</TooltipMain>
                        <TooltipText>Progress: ({attendedClasses}/{totalClasses})</TooltipText>
                        <TooltipText>Completion Rate: {attendancePercentage}%</TooltipText>
                    </>
                ) : (
                    <>
                        <TooltipMain>{subName.subName}</TooltipMain>
                        <TooltipText>Achievement Points: {marksObtained}</TooltipText>
                    </>
                )}
            </CustomTooltip>
        );
    }

    return null;
};

const CustomBarChart = ({ chartData, dataKey }) => {
    const subjects = chartData.map((data) => data.subject);
    const distinctColors = generateDistinctColors(subjects.length);

    return (
        <BarChart width={500} height={500} data={chartData}>
            <XAxis 
                dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} 
                tick={{ fill: '#ff79c6', fontSize: 14, fontWeight: 500, fontFamily: 'Poppins' }}
            />
            <YAxis 
                domain={[0, 100]} 
                tick={{ fill: '#e6e6e6', fontSize: 14, fontFamily: 'Poppins' }}
            />
            <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
            <Bar 
                dataKey={dataKey}
                radius={[12, 12, 0, 0]}
            >
                {chartData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={distinctColors[index]}
                        style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' }}
                    />
                ))}
            </Bar>
        </BarChart>
    );
};

const generateDistinctColors = (count) => {
    const baseColors = [
        '#ff79c6', // Pink
        '#bd93f9', // Purple
        '#ff5555', // Red
        '#8be9fd', // Cyan
        '#50fa7b', // Green
        '#f1fa8c', // Yellow
    ];

    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }

    return colors;
};

const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart;
