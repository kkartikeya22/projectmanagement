import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#ff79c6', '#bd93f9']; // Pink and purple from theme

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text 
            x={x} 
            y={y} 
            fill="#ffffff"
            textAnchor={x > cx ? 'start' : 'end'} 
            dominantBaseline="central"
            style={{
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomPieChart = ({ data }) => {
    return (
        <div style={{ 
            background: '#1e1e1e',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 121, 198, 0.2)',
            transition: 'all 0.3s ease-in-out'
        }}>
            <h4 style={{ 
                textAlign: 'center', 
                color: '#ff79c6',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                marginBottom: '20px',
                fontSize: '1.5rem'
            }}>
                Progress Tracker 🎯
            </h4>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]}
                                stroke="#121212"
                                strokeWidth={3}
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value, name) => [`${value} points`, name]}
                        contentStyle={{
                            background: '#1e1e1e',
                            border: '1px solid #ff79c6',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(255, 121, 198, 0.2)',
                            color: '#ffffff',
                            fontFamily: 'Poppins, sans-serif'
                        }}
                        labelStyle={{ color: '#ffffff' }}
                        itemStyle={{ color: '#ffffff' }}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                            <span style={{ 
                                color: '#e6e6e6', 
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif'
                            }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;