import Enrollment from "../models/enrollmentModel.js";
import Payment from "../models/paymentModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import moment from "moment"; // For date operations

// @desc    Get Dashboard Data
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardData = asyncHandler(async (req, res) => {
  const currentYear = moment().year();
  const lastMonth = moment().subtract(1, 'months');
  const monthBeforeLast = moment().subtract(2, 'months');

  // 1. Total number of enrollments
  const totalEnrollments = await Enrollment.countDocuments();

  // 2. Total number of enrollments in "Completed" status
  const completedEnrollments = await Enrollment.countDocuments({ status: 'Completed' });

  // 3. Total number of enrollments NOT in "Completed" status
  const notCompletedEnrollments = await Enrollment.countDocuments({ status: { $ne: 'Completed' } });

  // 4. Total revenue so far
  const totalRevenue = await Payment.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    { $project: { _id: 0, totalRevenue: 1 } }
  ]);


   // 5. Total revenue for current year
   const revenueCurrentYear = await Payment.aggregate([
    {
        $addFields: {
          // Convert the string dateTime to a proper Date object
          date: { $dateFromString: { dateString: "$dateTime" } }
        }
      },
    { $match: { date: { $gte: moment().startOf('year').toDate(), $lte: moment().endOf('year').toDate() } } },
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    { $project: { _id: 0, totalRevenue: 1 } }
  ]);
    

   // 5. Total revenue for current year
   const revenueCurrentMonth = await Payment.aggregate([
    {
        $addFields: {
          // Convert the string dateTime to a proper Date object
          date: { $dateFromString: { dateString: "$dateTime" } }
        }
      },
    { $match: { date: { $gte: moment().startOf('month').toDate(), $lte: moment().endOf('month').toDate() } } },
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    { $project: { _id: 0, totalRevenue: 1 } }
  ]);
    

  // 5. Total revenue for last month
  const revenueLastMonth = await Payment.aggregate([
    {
        $addFields: {
          // Convert the string dateTime to a proper Date object
          date: { $dateFromString: { dateString: "$dateTime" } }
        }
      },
    { $match: { date: { $gte: lastMonth.startOf('month').toDate(), $lte: lastMonth.endOf('month').toDate() } } },
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    { $project: { _id: 0, totalRevenue: 1 } }
  ]);

  // 6. Total revenue for the month before last
  const revenueMonthBeforeLast = await Payment.aggregate([
    {
        $addFields: {
          // Convert the string dateTime to a proper Date object
          date: { $dateFromString: { dateString: "$dateTime" } }
        }
      },
    { $match: { date: { $gte: monthBeforeLast.startOf('month').toDate(), $lte: monthBeforeLast.endOf('month').toDate() } } },
    { $group: { _id: null, totalRevenue: { $sum: "$paidAmount" } } },
    { $project: { _id: 0, totalRevenue: 1 } }
  ]);

  // 7. Percentage increase in revenue for last month and month before last
  const revenueIncreaseLastMonth = ((revenueLastMonth[0]?.totalRevenue || 0) - (revenueMonthBeforeLast[0]?.totalRevenue || 0)) / (revenueMonthBeforeLast[0]?.totalRevenue || 1) * 100;

  // 8. Top 3 training packages by number of enrollments
  const topPackages = await Enrollment.aggregate([
    { $group: { _id: "$trainingPackage", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $lookup: { from: "trainingpackages", localField: "_id", foreignField: "_id", as: "packageDetails" } },
    { $unwind: "$packageDetails" },
    { $project: { packageName: "$packageDetails.name", count: 1 } }
  ]);

  // 9. Monthly revenue for the current year (Bar chart data)
//   const monthlyRevenue = await Payment.aggregate([
//     {
//       $match: {
//         dateTime: {
//           $gte: moment().startOf('year').toDate(),
//           $lte: moment().endOf('month').toDate(),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: { month: { $month: "$dateTime" } },
//         totalRevenue: { $sum: "$paidAmount" }
//       }
//     },
//     {
//       $sort: { "_id.month": 1 }
//     }
//   ]);

//   const labels = monthlyRevenue.map((item) => moment().month(item._id.month - 1).format("MMMM"));
//   const revenueData = monthlyRevenue.map((item) => item.totalRevenue);


  

  const allPayments = await Payment.find();


  const generateRevenueChartData = (payments) => {
    // Initialize months and revenue data
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const monthlyRevenue = Array(12).fill(0);  // Initialize an array with 0 for each month
  
    // Iterate over payments and accumulate revenue for each month
    payments.forEach(payment => {
      const paymentMonth = moment(payment.dateTime).month(); // Get the month (0-11)
      monthlyRevenue[paymentMonth] += payment.paidAmount; // Add payment to the respective month
    });
  
    // Return chart data
    return {
      labels: months.slice(0, moment().month() + 1),  // Return labels up to current month
      revenueData: monthlyRevenue.slice(0, moment().month() + 1),  // Return data up to current month
    };
  };

  const chartData=generateRevenueChartData(allPayments);


  // Send back the result as JSON
  res.json({
    totalEnrollments,
    completedEnrollments,
    notCompletedEnrollments,
    totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    revenueCurrentYear:revenueCurrentYear[0]?.totalRevenue || 0,
    revenueCurrentMonth:revenueCurrentMonth[0]?.totalRevenue || 0,
    revenueLastMonth: revenueLastMonth[0]?.totalRevenue || 0,
    revenueMonthBeforeLast: revenueMonthBeforeLast[0]?.totalRevenue || 0,
    revenueIncreaseLastMonth,
    topPackages,
    chartData
  });
});

export { getDashboardData };
