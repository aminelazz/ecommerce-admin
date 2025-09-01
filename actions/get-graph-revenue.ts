import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string
  total: number
}

export const getGraphRevenue = async (storeId: string) => {
  // Fetch all paid orders for the given store, including their items and associated products
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Initialize an object to store revenue grouped by month
  const monthlyRevenue: { [key: number]: number } = {};

  // Iterate through each paid order to calculate revenue
  for (const order of paidOrders) {
    // Extract the month from the order's creation date
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    // Sum up the price of all products in the order
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Add the revenue for this order to the corresponding month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Prepare the graph data with default values for all months
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Update the graph data with the calculated revenue for each month
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  // Return the graph data for visualization
  return graphData;
};
