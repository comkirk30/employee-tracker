const { query } = require('./connection');
const db = require('./connection');

class Query{
    showAllRoles(){

        return new Promise((resolve,reject)=> {
            db.query('select * from role', (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(console.table(results));
            });
        })
    }
    showAllDepartments(){

        return new Promise((resolve,reject)=> {
            db.query('select * from department', (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(console.table(results));
            });
        })
    }
    showAllEmployees(){

        return new Promise((resolve,reject)=> {
            db.query('select * from employee', (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(console.table(results));
            });
        })
    }
    addDepartment(departmentName){

        return new Promise((resolve,reject)=> {
            db.query(`insert into department (name) values ('${departmentName}')`, (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(()=> "Successfully added new department");
            });
        });
    }
    addRole(role){

        return new Promise((resolve,reject)=> {
            db.query('insert into role set?', role, (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(()=> "Successfully added new role");
            });
        });
    }
    addEmployee(employee){

        return new Promise((resolve,reject)=> {
            db.query('insert into employee set?', employee, (err, results)=> {
                if(err){
                    reject(console.log('err ',err))
                }
                resolve(()=> "Successfully added new employee");
            });
        });
    }
}
    





module.exports = new Query();