import { getErrorMessage } from "./../utils/Error";
import { AssemblyScehema } from "../schema";

const getAllAssemblies = async (req: any, res: any) => {
  try {
    const items = await AssemblyScehema.find();
    if (items.length === 0) {
      res.code(200).send({
        isError: true,
        message: "No Assemblies found",
        data: [],
      });
    } else {
      res.code(200).send({
        isError: false,
        message: "Assemblies fetched successfully",
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

const getAssembly = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await AssemblyScehema.findById(id);
    if (item) {
      res.code(200).send({
        isError: false,
        message: "Assembly fetched successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "No Assembly found",
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

const createAssembly = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const findIfNameExists = await AssemblyScehema.findOne({ name });
    if (findIfNameExists) {
      res.code(200).send({
        isError: true,
        message: "Assembly exists.Please create other assembly",
      });
    } else {
      const newItem = new AssemblyScehema(req.body);
      const saveNewItem = await newItem.save();
      if (saveNewItem) {
        res.code(201).send({
          isError: true,
          message: "Assembly created successfully",
          data: saveNewItem,
        });
      } else {
        res.code(400).send({
          isError: true,
          message: `Failed to create assembly`,
          data: null,
        });
      }
    }
  } catch (error) {
    res.code(500).send({
      isError: true,
      message: getErrorMessage(error),
      data: null,
    });
  }
};

const deleteAssembly = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await AssemblyScehema.findById(id);
    if (item) {
      item.deleteOne();
      res.code(200).send({
        isError: false,
        message: "Assembly deleted successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "Failed to find Assembly with such id",
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

const editAssembly = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const item = await AssemblyScehema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (item) {
      res.code(200).send({
        isError: false,
        message: "Assembly updated successfully",
        data: item,
      });
    } else {
      res.code(200).send({
        isError: true,
        message: "Assembly with id not found",
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

export {
  getAllAssemblies,
  getAssembly,
  createAssembly,
  deleteAssembly,
  editAssembly,
};
