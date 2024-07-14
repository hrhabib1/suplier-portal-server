const router = require('express').Router()
const employeeController = require('../Controller/EmployeeController')

// employee routes
router.get('/employees',employeeController.getAllEmployees )
router.post('/employees',employeeController.createEmployee )
router.get('/employees/:id',employeeController.getEmployeeById )
router.put('/employees/:employees_id',employeeController.updateEmployee )
router.delete('/employees/:employees_id',employeeController.deleteEmployee )
 
module.exports= router;  