import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { ArcElement } from "chart.js";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
Chart.register(ArcElement);

// Register the chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topPacakgeGraphChartData, setTopPackageChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/dashboard"); // Call your API endpoint
        setDashboardData(data);

        setTopPackageChartData(converToChartData(data.topPackages));

        setLoading(false);
      } catch (error) {
        setError("Error fetching dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const converToChartData = (arrayDate) => {
    const chartData = {
      labels: [],
      count: [],
    };

    arrayDate.forEach((data) => {
      chartData.labels.push(data.packageName);
      chartData.count.push(data.count);
    });

    return chartData;
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  // Bar Chart Data
  const barChartData = {
    labels: dashboardData.chartData.labels,
    datasets: [
      {
        label: "Revenue per Month",
        data: dashboardData.chartData.revenueData,
        backgroundColor: [
          "#4BC0C0", // Solid color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],

        borderColor: [
          "#4BC0C0", // Matching solid border color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],

        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue for Each Month in the Current Year",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  //sidewiseChart
  const barChartSideWiseData = {
    labels: topPacakgeGraphChartData.labels,
    datasets: [
      {
        label: "No of Enrollments",
        data: topPacakgeGraphChartData.count,
        backgroundColor: [
          "#4BC0C0", // Solid color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],
        borderColor: [
          "#4BC0C0", // Matching solid border color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartSideWiseOptions = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Packages Based on Enrollments",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Prevent default aspect ratio
    plugins: {
      legend: {
        position: "top", // Position of the legend
        labels: {
          boxWidth: 20, // Width of the box for legend items
          padding: 15, // Padding between legend items
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Customize tooltip label
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true, // Show the title
        text: "Amount Paid - Balance ", // Title text
        font: {
          size: 16, // Font size for the title
        },
      },
    },
    animation: {
      animateScale: true, // Animate the scale when rendering
      animateRotate: true, // Animate the rotation when rendering
    },
    cutout: "70%", // Define the cutout size (percentage of the radius)
  };

  // Sample data for the Doughnut chart
  const doughnutChartData = {
    labels: ["Paid", "Balance"],
    datasets: [
      {
        data: [2000, 1000],
        backgroundColor: [
          "#4BC0C0", // Solid color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],
        borderColor: [
          "#4BC0C0", // Matching solid border color for each bar
          "#36A2EB",
          "#9966FF",
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Row className="mb-4">
            <Col md={6}>
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Earnings (Monthly)
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        Rs {dashboardData.revenueCurrentMonth}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Earnings (Annual)
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                      Rs {dashboardData.revenueCurrentYear}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Enrollments (All)
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {dashboardData.totalEnrollments}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Enrollments (Finished)
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {dashboardData.completedEnrollments}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={4} className="mb-4 shadow-box">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          {/* <Card>
            <Card.Body>
           
            </Card.Body>
          </Card>
         */}
        </Col>
      </Row>

      <Row className="p-20 shadow-box mb-4">
        <Col md={6} className="mb-4 ">
          <Bar data={barChartData} options={barChartOptions} />
          {/* <Card>
            <Card.Body>
   
            </Card.Body>
          </Card> */}
        </Col>
        <Col md={6} className="mb-4">
          <Bar data={barChartSideWiseData} options={barChartSideWiseOptions} />
          {/* <Card>
            <Card.Body>
           
            </Card.Body>
          </Card> */}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Top 3 Training Packages</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Package Name</th>
                    <th>Enrollments</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.topPackages.map((pkg, index) => (
                    <tr key={pkg._id}>
                      <td>{index + 1}</td>
                      <td>{pkg.packageName}</td>
                      <td>{pkg.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
