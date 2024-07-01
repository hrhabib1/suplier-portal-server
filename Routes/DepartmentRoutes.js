const router = require('express').Router()
const departmentController = require('../Controller/DepartmentController')

router.get('/departments',departmentController.getAllDepartment )
router.post('/departments',departmentController.createDepartment )
router.put('/departments/:departments_id',departmentController.updateDepartment )
router.delete('/departments/:departments_id',departmentController.deleteDepartment )

module.exports= router;