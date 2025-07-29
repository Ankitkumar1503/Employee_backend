import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { create, findById, findAll, findByName, updateById, deleteById, deleteAll } from '../models/employee.model.js';

export const createEmployee = async (req, res) => {
  try {
    const employee = await create(req.body);
    res.status(201).json(new ApiResponse(201, employee, "Employee created successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiError(500, "Failed to create employee", error));
  }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        
        if (!employeeId) {
            return res.status(400).json(new ApiError(400, "Employee ID is required"));
        }
        
        const employee = await findById(employeeId);
        
        if (!employee) {
            return res.status(404).json(new ApiError(404, "Employee not found"));
        }
        
        res.status(200).json(new ApiResponse(200, employee, "Employee retrieved successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Failed to retrieve employee", error));
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const { name } = req.query;
        
        let employees;
        let message;
        
        if (name) {
            // Search employees by name keyword
            employees = await findByName(name);
            message = `Employees with name containing "${name}" retrieved successfully`;
        } else {
            // Get all employees
            employees = await findAll();
            message = "All employees retrieved successfully";
        }
        
        res.status(200).json(new ApiResponse(200, employees, message));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Failed to retrieve employees", error));
    }
};

export const updateEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updateData = req.body;
        
        if (!employeeId) {
            return res.status(400).json(new ApiError(400, "Employee ID is required"));
        }
        
        // Check if employee exists
        const existingEmployee = await findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json(new ApiError(404, "Employee not found"));
        }
        
        const updatedEmployee = await updateById(employeeId, updateData);
        res.status(200).json(new ApiResponse(200, updatedEmployee, "Employee updated successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Failed to update employee", error));
    }
};

export const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        
        if (!employeeId) {
            return res.status(400).json(new ApiError(400, "Employee ID is required"));
        }
        
        // Check if employee exists
        const existingEmployee = await findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json(new ApiError(404, "Employee not found"));
        }
        
        await deleteById(employeeId);
        res.status(200).json(new ApiResponse(200, null, "Employee deleted successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Failed to delete employee", error));
    }
};

export const deleteAllEmployees = async (req, res) => {
    try {
        const deletedCount = await deleteAll();
        res.status(200).json(new ApiResponse(200, { deletedCount }, "All employees deleted successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Failed to delete all employees", error));
    }
};