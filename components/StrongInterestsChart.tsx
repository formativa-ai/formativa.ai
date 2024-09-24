import React from 'react';
import {StrongInterest, StrongInterestsResult} from '@/lib/types/PersonalDataProfile';

export default function StrongInterestsChart({ data } : { data: StrongInterestsResult }){
    const interests: StrongInterest[] = [
        data?.Realistic,
        data?.Investigative,
        data?.Artistic,
        data?.Social,
        data?.Enterprising,
        data?.Conventional
    ];


    const scores = interests.map((interest) => interest?.score);
    const maxScore = 100; //Math.max(...scores, 1); // Avoid division by zero

    const size = 300; // Size of the SVG
    const center = size / 2;
    const radius = center - 10; // No paddingneeded for text

    const angleSlice = (Math.PI * 2) / interests.length; // Angle between each interest (circumference of a circle is 2πr)

    const gridLevels = 3; // Number of concentric circles

    // Color mapping for each interest


    const colorMapping: { [key: string]: { fill: string, border: string, text: string } } = {
        Realistic: {    // Red
            fill: 'rgb(248, 113, 113, 0.2)',
            border: 'rgba(248, 113, 113, 0.4)',
            text: '#FF6384',
        },
        Investigative: {    // Blue
            fill: 'rgba(96, 165, 250, 0.2)',
            border: 'rgba(96, 165, 250, 0.4)',
            text: '#36A2EB',
        },
        Artistic: {    // Teal
            fill: 'rgba(45, 212, 141, 0.2)',
            border: 'rgba(45, 212, 141, 0.4)',
            text: '#4BC0C0',
        },
        Social: {    // Purple
            fill: 'rgba(129, 140, 248 , 0.2)',
            border: 'rgba(129, 140, 248, 0.4)',
            text:  '#9966FF'
        },
        Enterprising: {    // Orange
            fill: 'rgba(251, 146, 60 , 0.2)',
            border: 'rgba(251, 146, 60, 0.4)',
            text: '#FF9F40',
        },
        Conventional: {    // Yellow
            fill: 'rgba(250, 204, 21, 0.2)',
            border: 'rgba(250, 204, 21, 0.4)',
            text: '#FFCE56',
        },
    };


    // Helper functions to calculate polar coordinates
    const polarToCartesian = (
        cx: number,
        cy: number,
        r: number,
        angle: number
    ) => {
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle),
        };
    };

    // Function to describe the path for each sector
    const describeSector = (
        cx: number,
        cy: number,
        r: number,
        startAngle: number,
        endAngle: number
    ) => {
        const start = polarToCartesian(cx, cy, r, startAngle);
        const end = polarToCartesian(cx, cy, r, endAngle);

        const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

        const d = [
            `M ${cx} ${cy}`, // Move to center
            `L ${start.x} ${start.y}`, // Line to start point
            `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, // Arc to end point
            'Z', // Close path
        ].join(' ');

        return d;
    };

    return (
        <div className="flex justify-center items-center">
            <svg width={size} height={size}>
                {/* Draw the colored sectors */}
                {interests.map((interest, i) => {
                    const startAngle = angleSlice * i - 2*Math.PI / 3;
                    const endAngle = angleSlice * (i + 1) - 2*Math.PI / 3;
                    const pathData = describeSector(center, center, radius, startAngle, endAngle);
                    const color = colorMapping[interest?.interest];

                    return (
                        <path
                            key={i}
                            d={pathData}
                            fill={color?.text}
                            stroke="black"
                            strokeWidth="2"

                        />
                    );
                })}

                {/* /!*Draw the concentric circles*!/*/}
                {/*{[...Array(gridLevels)].map((_, idx) => {*/}
                {/*    const level = idx + 1;*/}
                {/*    const r = (radius / gridLevels) * level;*/}
                {/*    return (*/}
                {/*        <circle*/}
                {/*            key={idx}*/}
                {/*            cx={center}*/}
                {/*            cy={center}*/}
                {/*            r={r}*/}
                {/*            fill="none"*/}
                {/*            stroke="black"*/}
                {/*            strokeWidth="1"*/}
                {/*        />*/}
                {/*    );*/}
                {/*})}*/}

                {/* Draw the radar area */}
                <polygon
                    points={interests
                        .map((interest, i) => {
                            const angle = angleSlice * i - Math.PI / 2;
                            const scoreRatio = interest?.score / maxScore;
                            const x = center + radius * scoreRatio * Math.cos(angle);
                            const y = center + radius * scoreRatio * Math.sin(angle);
                            return `${x},${y}`;
                        })
                        .join(' ')}
                    fill="rgba(255, 255, 255, 0.5)"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth=""
                />

                {/* Draw the labels */}
                {interests.map((interest, i) => {
                    const angle = angleSlice * i - Math.PI / 2;
                    const x = center + (radius) * Math.cos(angle);
                    const y = center + (radius) * Math.sin(angle);
                    const color = colorMapping[interest?.interest];
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={color?.text}
                        >
                            {interest?.interest.charAt(0).toUpperCase()}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

