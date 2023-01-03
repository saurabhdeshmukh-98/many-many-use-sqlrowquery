const connect = require("../db/config");
const con = require("mysql");

const manyTomanyDataInsertMap = async (req, res) => {
  try {
    const sql = `create table employee(emp_id int primary key not null,emp_name varchar(45) not null, age int not null);
    insert into employee(emp_id,emp_name,age) values(${req.body.emp_id},'${req.body.emp_name}','${req.body.age}');
      create table manager(man_id int primary key not null,man_name varchar(45) not null, man_age int not null);  
      insert into manager(man_id,man_name,man_age) values(${req.body.man_id},'${req.body.man_name}','${req.body.man_age}');  
      create table employee_manager(emp_mng_id int primary key not null,emp_id int not null,man_id int not null,
       foreign key(emp_id) references employee(emp_id),
       foreign key(man_id)references manager(man_id)
       insert into employee_manager(emp_mng_id,emp_id,man_id) values(${req.body.emp_mng_id},'${req.body.emp_name}','${req.body.man_id}')`;

    const resp = await connect.query(sql, function (req, res) {
      if (err) throw err;
      console.log(resp);
    });
    if (resp) {
      console.log("data insert successfully occers");
    } else {
      console.log("data insert unsuccessfully");
    }
  } catch (error) {
    console.log(error);
    res.send("cheak onece it is wrong.......");
  }
};

const empAgeBelongsToMan = async (req, res) => {
  try {
    const sql = `select manager.man_id,man_name,man_age,count(employee.emp_id)
    from manager 
    left join employee_manager on manager.man_id=employee_manager.man_id
    left join employee on (employee.emp_id=employee_manager.emp_id
    and employee.age>=40)
    group by man_id
    having count(employee.emp_id)=0;`;
    await connect.query(sql, function (error, resp) {
      if (err) throw err;
      res.status(200).json({
        response: resp,
        message: "its successfully getting the data........",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
      message: "data not getting successfully.........",
    });
  }
};

const listOfEmpUnderManager = async (req, res) => {
  try {
    const sql = `select *
    from (select emp_id,count(emp_id) as sumcount from employee_manager group by emp_id ) as emp where sumcount<=2;`;
    await connect.query(sql, function (error, resp) {
      if (err) throw err;
      res.status(200).json({
        response: resp,
        message: "its successfully getting the data........",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
      message: "data not getting successfully.........",
    });
  }
};
module.exports = {
  manyTomanyDataInsertMap,
  empAgeBelongsToMan,
  listOfEmpUnderManager,
};
