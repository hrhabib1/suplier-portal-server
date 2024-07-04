const router = require('express').Router()
const departmentController = require('../Controller/DepartmentController')

// departments routes
router.get('/departments',departmentController.getAllDepartment )
router.get('/departments/:id',departmentController.getDepartmentById )
router.post('/departments',departmentController.createDepartment )
router.put('/departments/:departments_id',departmentController.updateDepartment )
router.delete('/departments/:departments_id',departmentController.deleteDepartment )

// employee routes
router.get('/employees',departmentController.getAllEmployees )
router.post('/employees',departmentController.createEmployee )

module.exports= router;