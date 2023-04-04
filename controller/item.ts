import { getErrorMessage } from "./../utils/Error";
import { ItemsSchema } from "../schema";

const getAllItems = async (req: any, res: any) => {
  const { category } = req.query;
  try {
    const items = await ItemsSchema.find({
      category: (category === "" || category === "All") && undefined,
    });
    if (items.length === 0) {
      res.code(200).send({
        isError: true,
        message: "No Items found",
        data: [],
      });
    } else {
      res.code(200).send({
        isError: false,
        message: "Items fetched successfully",
        data: items,
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

const getItem = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await ItemsSchema.findById(id);
    if (item) {
      res.code(200).send({
        isError: false,
        message: "Item fetched successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "No item found",
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

const createItem = async (req: any, res: any) => {
  try {
    const newItem = new ItemsSchema(req.body);
    const saveNewItem = await newItem.save();
    if (saveNewItem) {
      res.code(201).send({
        isError: true,
        message: "Item created successfully",
        data: saveNewItem,
      });
    } else {
      res.code(400).send({
        isError: true,
        message: `Failed to create item`,
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

const deleteItem = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await ItemsSchema.findById(id);
    if (item) {
      item.deleteOne();
      res.code(200).send({
        isError: false,
        message: "Item deleted successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "Failed to find item with such id",
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

const editItem = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await ItemsSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (item) {
      res.code(200).send({
        isError: false,
        message: "item updated successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "item with id not found",
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

export { getAllItems, getItem, createItem, deleteItem, editItem };
