import connection from "../config/db.config.js";

export const create = async (employee) => {
    const [result] = await connection.query(
        "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
        [employee.name, employee.position, employee.salary]
    );
    return {id: result.insertId, ...employee};
};

export const findById = async (id) => {
    const [rows] = await connection.query(
        "SELECT * FROM employees WHERE id = ?",
        [id]
    );
    return rows[0] || null;
};

export const findAll = async () => {
    const [rows] = await connection.query(
        "SELECT * FROM employees"
    );
    return rows;
};

export const findByName = async (nameKeyword) => {
    const [rows] = await connection.query(
        "SELECT * FROM employees WHERE name LIKE ?",
        [`%${nameKeyword}%`]
    );
    return rows;
};

export const updateById = async (id, updateData) => {
    // Build dynamic update query
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    if (fields.length === 0) {
        throw new Error("No fields to update");
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE employees SET ${setClause} WHERE id = ?`;
    
    await connection.query(query, [...values, id]);
    
    // Return updated employee
    return await findById(id);
};

export const deleteById = async (id) => {
    const [result] = await connection.query(
        "DELETE FROM employees WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

export const deleteAll = async () => {
    const [result] = await connection.query(
        "DELETE FROM employees"
    );
    return result.affectedRows;
};