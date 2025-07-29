import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  deleteAllEmployees,
} from "../controllers/employee.controller.js";

const router = Router();

router.post("/create", createEmployee);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployeeById);
router.patch("/employees/:id", updateEmployeeById);
router.delete("/employees/:id", deleteEmployeeById);
router.delete("/employees", deleteAllEmployees);

export default router;
