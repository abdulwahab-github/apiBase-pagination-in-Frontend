import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // This will automatically register required components

const OrderAnalyticsChart = () => {
  const [chartData, setChartData] = useState({});
  const [type, setType] = useState('yearly'); // Default to 'yearly'

  // Fetch analytics data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orderAnalytics?filter=${type}`, {
            method: 'GET', // Specify the method if it's not GET
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg1MTAyZTc5NGQzZTJmZmRjOWU2OTYiLCJlbWFpbCI6IndhaGFicWFkaXI3NjFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTUp6SGtVRmlpdmNmblphMW4yT3dlLmRkNTVDcTZtY0Nlc0Ztbjl4MlZNblVWeUNtL0d5NlMiLCJwdXJwb3NlIjoidXNlciIsImlzQmFuIjpmYWxzZSwiaWF0IjoxNzI1NzAwNTk5fQ.xnGArenPg0itCZp2KpCvHqlIaPZNJi3BqCOhm2dRIbQ', // Example header, replace with your actual header and value
                // 'Content-Type': 'application/json' // Example header for JSON content
            }
        });
        
        const data = await response.json();

        if (data?.totalOrders?.length > 0) {
          let labels = [];
          let orderCounts = [];
          let fullDates = [];

          if (type === 'weekly') {
            labels = data.totalOrders.map(order => order._id);
            orderCounts = data.totalOrders.map(order => order.count);
            fullDates = data.totalOrders.map(order => {
              const date = new Date(new Date().getFullYear(), new Date().getMonth(), order._id);
              return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
            });
          } else if (type === 'monthly') {
            labels = data.totalOrders.map(order => order._id);
            orderCounts = data.totalOrders.map(order => order.count);
            fullDates = data.totalOrders.map(order => {
              const monthIndex = new Date(Date.parse(order._id +" 1, 2024")).getMonth(); // Convert to month index
              const date = new Date(2024, monthIndex, 1);
              return date.toLocaleDateString('en-GB', {
                month: 'long',
                year: 'numeric',
              });
            });
          } else if (type === 'yearly') {
            labels = data.totalOrders.map(order => order._id);
            orderCounts = data.totalOrders.map(order => order.count);
            fullDates = data.totalOrders.map(order => {
              return order._id; // For yearly, we just use the year as is
            });
          }

          setChartData({
            labels,
            datasets: [
              {
                label: 'Orders',
                data: orderCounts,
                backgroundColor: '#00cfff',
                borderColor: '#007bbf',
                borderWidth: 1,
              },
            ],
            fullDates, // Store the full dates to use in the tooltip
          });
        } else {
          console.error('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type]); // Re-fetch data when 'type' changes

  return (
    <div>
      <div>
        <button onClick={() => setType('weekly')}>Weekly</button>
        <button onClick={() => setType('monthly')}>Monthly</button>
        <button onClick={() => setType('yearly')}>Yearly</button>
      </div>
      {chartData?.labels?.length && chartData?.datasets?.length ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Orders',
                },
              },
              x: {
                title: {
                  display: true,
                  text: type === 'yearly' ? 'Year' : type === 'monthly' ? 'Month' : 'Day',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  // Display the full date when hovering
                  label: function (tooltipItem) {
                    const fullDate = chartData.fullDates[tooltipItem.dataIndex];
                    const count = tooltipItem.raw;
                    return `${fullDate}: ${count} order${count > 1 ? 's' : ''}`;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart data...</p> // Loading state
      )}
    </div>
  );
};

export default OrderAnalyticsChart;
