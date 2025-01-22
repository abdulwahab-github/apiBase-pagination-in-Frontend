import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ type }) => {
    const [salesData, setSalesData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`http://192.168.18.125:3000/sales-data?type=${type}`);
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [type]);

    // Prepare data for the chart
    const chartData = {
        labels: [], // Dates or labels for x-axis
        datasets: [
            {
                label: 'Sales',
                data: [], // Sales data for y-axis
                borderColor: '#00ffcc', // Set line color like in your image
                backgroundColor: 'rgba(0, 255, 204, 0.1)', // Transparent background
                fill: true,
                tension: 0.4, // Smooth the curve (as shown in your image)
                pointRadius: 0, // Hide points to match the style
                borderWidth: 2, // Thicker line for better visibility
            },
        ],
    };

    // Populate data for different types
    if (type === 'monthly' && salesData.monthly) {
        for (const [key, value] of Object.entries(salesData.monthly)) {
            chartData.labels.push(key); // e.g., "2024-01"
            chartData.datasets[0].data.push(value);
        }
    } else if (type === 'weekly' && salesData.last7Days) {
        salesData.last7Days.forEach((dayData) => {
            chartData.labels.push(dayData.date); // Date string for X-axis
            chartData.datasets[0].data.push(dayData.sales); // Corresponding sales
        });
    } else if (type === 'yearly' && salesData.yearly) {
        for (const [key, value] of Object.entries(salesData.yearly)) {
            chartData.labels.push(key); // Year label
            chartData.datasets[0].data.push(value);
        }
    }

    return (
        <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#000', padding: '20px', borderRadius: '10px' }}>
            {loading ? (
                <p style={{ color: '#fff' }}>Loading...</p>
            ) : (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#fff', // White text for Y-axis
                                    callback: (value) => `${value}`, // Y-axis values as plain numbers
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
                                },
                            },
                            x: {
                                ticks: {
                                    color: '#fff', // White text for X-axis
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false, // Hide the legend as in your image
                            },
                            tooltip: {
                                backgroundColor: '#333', // Dark tooltip background
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderColor: '#00ffcc',
                                borderWidth: 1,
                                callbacks: {
                                    label: (tooltipItem) => `$${tooltipItem.raw}k`, // Tooltip format with 'k'
                                    title: (tooltipItems) => tooltipItems[0].label, // Date as title
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default SalesChart;
