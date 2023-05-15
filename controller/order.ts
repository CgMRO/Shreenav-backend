import { getErrorMessage } from "./../utils/Error";
import { AssemblyScehema, ItemsSchema, OrderSchema } from "../schema";

const createOrder = async (req: any, res: any) => {
  try {
    const body = req.body;
    const item = body.item;
    const itemsData=await ItemsSchema.findById(item);
    const assemblyData=await AssemblyScehema.findById(body.assembly);
    const findItem = await ItemsSchema.findByIdAndUpdate(
      item,
      { $inc: { quantity: -body.quantity } },
      { new: true }
    );
    if (findItem) {
      const newOrder = new OrderSchema({...body,description:itemsData?.description,assembly:assemblyData?.name});
      const saveOrder = await newOrder.save();
      if (saveOrder) {
        res.code(201).send({
          isError: true,
          message: "Order created successfully",
          data: saveOrder,
        });
      } else {
        res.code(400).send({
          isError: true,
          message: `Failed to create Order`,
          data: null,
        });
      }
    } else {
      res.code(400).send({
        isError: true,
        message: `Failed to find item`,
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getOrder = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const order = await OrderSchema.findById(id);
    if (order) {
      res.code(200).send({
        isError: false,
        message: "Order fetched successfully",
        data: order,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "No Order found",
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const getAllOrder = async (req: any, res: any) => {
  try {
    const orders = await OrderSchema.find();
    if (orders.length === 0) {
      res.code(200).send({
        isError: true,
        message: "No orders found",
        data: [],
      });
    } else {
      res.code(200).send({
        isError: false,
        message: "orders fetched successfully",
        data: orders,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const deleteOrder = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const order = await OrderSchema.findById(id);
    if (order) {
      order.deleteOne();
      res.code(200).send({
        isError: false,
        message: "order deleted successfully",
        data: order,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "Failed to find order with such id",
        data: null,
      });
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

export { createOrder, getOrder, getAllOrder, deleteOrder };
