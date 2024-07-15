const database = require('../services/database')

// get all userItems
exports.getAllUserItems=async(req, res) => {
    try{
        const result = await database.pool.query('SELECT * FROM test."userItem"')
        
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error);
    }
}

// create userItems
exports.createUserItem = async (req, res) => {
    try {
      const userItems = req.body;
  
      // Assuming user_order is unique or primary key in your database table
      for (const item of userItems) {
        const existingUserItem = await database.pool.query({
          text: `SELECT * FROM test."userItem" WHERE user_order = $1`,
          values: [item.user_order],
        });
  
        if (existingUserItem.rows.length > 0) {
          // Update existing record
          const updateResult = await database.pool.query({
            text: `
              UPDATE test."userItem"
              SET user_name = $1, user_email = $2, user_job_title = $3, user_department_id = $4
              WHERE user_order = $5
              RETURNING *
            `,
            values: [
              item.user_name,
              item.user_email,
              item.user_job_title,
              item.user_department_id,
              item.user_order,
            ],
          }); 
  
          if (updateResult.rows.length > 0) {
            console.log(`Updated user item with user_order ${item.user_order}`);
          } else {
            console.log(`Failed to update user item with user_order ${item.user_order}`);
          }
        } else {
          // Insert new record
          const insertResult = await database.pool.query({
            text: `
              INSERT INTO test."userItem" (user_name, user_email, user_job_title, user_department_id, user_order)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *
            `,
            values: [
              item.user_name,
              item.user_email,
              item.user_job_title,
              item.user_department_id,
              item.user_order,
            ],
          });
  
          console.log(`Inserted new user item with user_order ${item.user_order}`);
        }
      }
  
      return res.status(201).json({ message: "Data updated or created successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  

// delete userItem
exports.deleteUserItem = async(req, res) => {
    try{
        const result = await database.pool.query({
            text: `DELETE FROM test."userItem" WHERE user_order = $1`,
            values:[  
                req.params.user_order 
            ]   
        })  
        if(result.rowCount ==0){
            return res.status(404).json({error: 'user not found'})
        }     
        return res.status(204).send() 

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

