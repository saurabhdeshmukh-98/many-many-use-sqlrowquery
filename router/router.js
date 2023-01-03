const router=require('express').Router();
const contro=require('../controller/manyToManyContro')

router.post('/save',contro.manyTomanyDataInsertMap);
router.get('/ageofmanager',contro.empAgeBelongsToMan);
router.get('/listofemp',contro.listOfEmpUnderManager);

module.exports=router