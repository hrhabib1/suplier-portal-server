const database = require('../services/database')

//  get all departments
exports.getAllDepartment=async(req, res) => {
    try{
        const result = await database.pool.query('SELECT * FROM test.departments2')
        
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error);
    }
}

// get single department
exports.getDepartmentById = async (req, res) => {
    try {
        const result = await database.pool.query({
            text: `SELECT * FROM test.departments2
                   WHERE departments_id = $1`,
            values:[req.params.id]
        })

        if(result.rowCount == 0) {
            return res.status(404).json({ error: "Department Not Found" });
        }

        return res.status(200).json(result.rows[0]);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// create departments
 exports.createDepartment = async(req, res) => {
    try{

        if(!req.body.departments_name){
            return res.status(422).json({error: 'Name is required'})
        }

        const result = await database.pool.query({
            text: `INSERT INTO test.departments2(departments_id, departments_name) VALUES($1, $2) RETURNING*`,
            values:[
                req.body.departments_id,
                req.body.departments_name
            ]
        })       
        return res.status(201).json(result.rows[0])
        
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

// update department
 exports.updateDepartment = async(req, res) => {
    try{

        if(!req.body.departments_name){
            return res.status(422).json({error: 'Name is required'})
        }

        const result = await database.pool.query({
            text: `UPDATE test.departments2 SET departments_name = $2 
            WHERE departments_id = $1 RETURNING*`,
            values:[
                req.params.departments_id,
                req.body.departments_name
            ]
        })  
        if(result.rowCount ==0){
            return res.status(404).json({error: 'Department not found'})
        }     
        return res.status(200).json(result.rows[0])

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

// delete department
 exports.deleteDepartment = async(req, res) => {
    try{
        const result = await database.pool.query({
            text: `DELETE FROM test.departments2 WHERE departments_id = $1`,
            values:[
                req.params.departments_id
            ]
        })  
        if(result.rowCount ==0){
            return res.status(404).json({error: 'Department not found'})
        }     
        return res.status(204).send()

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

// get all employees
exports.getAllEmployees=async(req, res) => {
    try{
        const result = await database.pool.query('SELECT * FROM test.employees2')
        
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error);
    }
}

// create employees
exports.createEmployee = async(req, res) => {
    try{

        if(!req.body.employee_name){
            return res.status(422).json({error: 'Name is required'})
        }

        const result = await database.pool.query({
            text: `INSERT INTO test.employees2(employees_id, employee_name, first_name, last_name, email, job_title, department_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING*`,
            values:[
                req.body.employees_id,
                req.body.employee_name,
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                req.body.job_title,
                req.body.department_id,
            ]
        })       
        return res.status(201).json(result.rows[0])
        
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

// single employee
exports.getEmployeeById = async (req, res) => {
    try {
        const result = await database.pool.query({
            text: `SELECT * FROM test.employees2
                   WHERE department_id = $1`,
            values:[req.params.id]
        })

        if(result.rowCount == 0) {
            return res.status(404).json({ error: "Employee Not Found" });
        }

        return res.status(200).json(result.rows); 
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// update employee
exports.updateEmployee = async(req, res) => {
    try{

        if(!req.body.employee_name){
            return res.status(422).json({error: 'Name is required'})
        }

        const result = await database.pool.query({
            text: `UPDATE test.employees2 SET employee_name = $2, first_name = $3, last_name = $4, email = $5, job_title = $6, department_id = $7 
            WHERE employees_id = $1 RETURNING*`,
            values:[
                req.params.employees_id,
                req.body.employee_name,
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                req.body.job_title,
                req.body.department_id,
            ]
        })  
        if(result.rowCount == 0){
            return res.status(404).json({error: 'employee not found'})
        }     
        return res.status(200).json(result.rows[0])

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}
