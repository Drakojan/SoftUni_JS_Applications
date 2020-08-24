class Company {
    
    constructor() {
        
        this.departments = []; //holds departments - objects {name: department, employees: [listOfEmployees]} // employees will hold name, salary, position
    }

    addEmployee(username, salary, position, department){

        if (!username || !salary || !position || !department) {
            
            throw new Error('Invalid input!')
        }

        if (Number(salary)<0) {
            
            throw new Error('Invalid input!')
        }

        let newEmployee = [username, Number(salary), position];

        if (this.departments.filter((x)=>x.name===department).length===0) {
            this.departments.push({"name": department, "employees": [newEmployee]}); 
        }
        else{
            this.departments.find((x)=>x.name===department)["employees"].push(newEmployee)
        }
         return `New employee is hired. Name: ${username}. Position: ${position}`
    }

    bestDepartment(){

        let bestDepartment;
        let highestSalary = 0;

        for (let i = 0; i < this.departments.length; i++) {
            
            let currentTotalSalary = 0;
            let currentAvgSalary =0;
            
            const currentDept = this.departments[i];
            
            currentDept.employees.forEach(employee => {
                currentTotalSalary+= employee[1]
            });

            currentAvgSalary=currentTotalSalary/(currentDept.employees.length);

            if (currentAvgSalary>highestSalary) {
                highestSalary=currentAvgSalary;
                bestDepartment=currentDept;
            }
        }

        let result = `Best Department is: ${bestDepartment.name}\nAverage salary: ${highestSalary.toFixed(2)}\n`;

        bestDepartment.employees.sort((a,b)=> {
            
            if (b[1]-a[1]!==0) {
                return b[1]-a[1];
            }
            else{
                return a[0].localeCompare(b[0]);
            }
        
        
        });

       result+= bestDepartment.employees.reduce((accumulator, currValue)=> {

            accumulator+=`${currValue[0]} ${currValue[1]} ${currValue[2]}\n`;

            return accumulator;

        },'')

        return result.trim();
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

console.log(c.bestDepartment());
