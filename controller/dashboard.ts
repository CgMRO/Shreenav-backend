import {
  ItemsSchema,
  LocationSchema,
  OrderSchema,
  VendorSchema,
} from "../schema";
import { formatDataByMonths } from "../utils/FormatMonths";
import { getErrorMessage } from "./../utils/Error";

const getTotal = async (req: any, res: any) => {
  try {
    const totalItems = await ItemsSchema.count();
    const totalOrders = await OrderSchema.count();
    const totalLocations = await LocationSchema.count();
    const totalMinQty = await ItemsSchema.find({
      $expr: {
        $lte: [{ $toInt: "$quantity" }, { $toInt: "$minQuantity" }],
      },
    }).count();
    const totalVendors = await VendorSchema.count();
    const totalCostSample = await OrderSchema.aggregate([
      {
        $group: {
          _id: null,
          cost: {
            $sum: "$cost",
          },
        },
      },
    ]);
    res.code(200).send({
      isError: true,
      message: "Analytics fetched successfully",
      data: {
        totalItems,
        totalOrders,
        totalLocations,
        totalVendors,
        totalCost: totalCostSample[0].cost,
        totalMinQty,
      },
    });
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getByYears = async (req: any, res: any) => {
  try {
    const totalNewOrders = await OrderSchema.aggregate([
      {
        $group: {
          _id: {
            createdAt: { $year: { $toDate: "$createdAt" } },
          },
          data: {
            $sum: 1,
          },
        },
      },
    ]);
    const totalNewItems = await ItemsSchema.aggregate([
      {
        $group: {
          _id: {
            createdAt: { $year: { $toDate: "$createdAt" } },
          },
          data: {
            $sum: 1,
          },
        },
      },
    ]);
    res.code(200).send({
      isError: true,
      message: "Analytics fetched successfully",
      data: {
        totalNewOrders,
        totalNewItems,
      },
    });
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getByMonths = async (req: any, res: any) => {
  try {
    const year = new Date().getFullYear();
    const thisYear = new Date(`${year}-01-01`);
    const nextYear = new Date(`${year}-12-31`);
    const order = await OrderSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: thisYear,
            $lt: nextYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          data: { $sum: 1 },
        },
      },
    ]);
    const items = await ItemsSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: thisYear,
            $lt: nextYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          data: { $sum: 1 },
        },
      },
    ]);
    res.code(200).send({
      isError: true,
      message: "Analytics fetched successfully",
      data: {
        order: formatDataByMonths(order),
        items: formatDataByMonths(items),
      },
    });
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

export { getTotal, getByYears, getByMonths };
