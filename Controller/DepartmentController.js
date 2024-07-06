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
