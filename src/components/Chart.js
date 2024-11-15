'use client';

import { differenceInDays, parseISO, formatISO9075 } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({ data }) {

    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No data available</p>;
      }

    const xLabelKey = Object.keys(data[0]).find(key => key !== 'date');

    const dataWithoutGaps = [];
    data.forEach((value, index) => {
        const date = value.date;
        dataWithoutGaps.push({
            date,
            [xLabelKey]: value?.[xLabelKey] || 0,
        });
        const nextDate = data?.[index + 1]?.date;
        if (date && nextDate) {
            const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));
            if (daysBetween > 0) {
                for (let i = 1; i < daysBetween; i++) {
                    const newDate = formatISO9075(addDays(parseISO(date), i)).split(' ')[0];
                    dataWithoutGaps.push({
                        date: newDate,
                        [xLabelKey]: 0,
                    });
                }
            }
        }
    });

    return (
        <div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart width={730} height={250} data={dataWithoutGaps}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} tick={{ fill: '#aaa' }} />
                    <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{ fill: '#aaa' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey={xLabelKey} stroke="#82ca9d" strokeWidth={4} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
