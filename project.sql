-- Database: EmployeeDB

-- DROP DATABASE IF EXISTS "EmployeeDB";

CREATE DATABASE "EmployeeDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
    
    drop table Department;
    CREATE TABLE Department(
    depart_id varchar(8),
    depart_name varchar(50),
    depart_city varchar(50),
    
    CONSTRAINT depart_id PRIMARY KEY (depart_id)
    
    );
    
    drop table Roles;
    CREATE TABLE Roles(
    role_id varchar(8),
    role varchar(25),
    
    CONSTRAINT role_id PRIMARY KEY (role_id)    
    );
    
    drop table Salaries;
    CREATE TABLE Salaries(
    salary_id varchar(8),
    salary_pa integer,
    
     CONSTRAINT salary_id PRIMARY KEY (salary_id) 
    );
    
    drop table Overtime_Hours;
    CREATE TABLE Overtime_Hours(
    Overtime_id varchar(8),
    overtime_hours integer,
        
    CONSTRAINT Overtime_id PRIMARY KEY (Overtime_id) 
    );
    
    
    drop table Employees;
    CREATE TABLE Employees (
    emp_id bigserial,
    first_name varchar(50),
    surname varchar(50),
    gender char(1),
    Address varchar(200),
    email varchar(200),
    depart_id varchar(8) REFERENCES Department (depart_id),
    role_id varchar(8) REFERENCES Roles (role_id),
    salary_id varchar(8) REFERENCES Salaries (salary_id),
    overtime_id varchar(8) REFERENCES Overtime_Hours (overtime_id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT emp_id PRIMARY KEY (emp_id)
    );
    DROP TABLE Employees;
    
INSERT INTO Employees (first_name, surname, gender, Address, email, depart_id,role_id, salary_id, overtime_id)
VALUES
 ('Nancy', 'Jones','F','16 cross str','ALI@ALI.com','d_1','r_2','s_3','hr_2'),
 ('Lee', 'Smith','M','564 klass main','Asad@Asad.com','d_6','r_5','s_4','hr_2'),
 ('Soo', 'Nguyen','M','67 smith rd','sns@gmail.com','d_4','r_3','s_2','hr_3'),
 ('Janet', 'King','F','123 main rd','jks@outlook.com','d_3','r_1','s_1','hr_3'),
 ('Clara','Blaze','F','987 unit 9 calvin','CBK@blaze.co.za','d_6','r_5','s_4','hr_2'),
 ('Jonas','Andries','M','65 midstream str','jat@yahoo.co.za','d_2','r_6','s_6','hr_2'),
 ('Andrew','Sebola','M','4556 halfway house','ams@icloud.com','d_5','r_4','s_5','hr_1'),
 ('Warren','Masemola','M','87 Midrand','wkm@gmail.com','d_3','r_1','s_1','hr_3'),
 ('Lethabo','Marks','F','9755 plot 7 cape','lom@email.com','d_5','r_4','s_5','hr_1'),
 ('Yogesh','Yadav','M','783 new castle','ppa@mail.com','d_4','r_3','s_2','hr_2'),
 ('Vishal ','Ron','F','765 orange way str','chicha@mail.com','d_1','r_2','s_3','hr_2'),
 ('Tanvi','Yoji','M','5452 CBD','yoji@mail.com','d_3','r_1','s_1','hr_3'),
 ('Ajit','Zara','F','65 Braam str','zara@mail.com','d_2','r_6','s_6','hr_2'),
 ('Ashish','Sam','F','543 Mainstreet','sam@mail.com','d_1','r_2','s_3','hr_2'),
 ('PAVAN','THAMAN','M','543 Sandton','THAMAN@gmail.com','d_5','r_4','s_5','hr_1');
 
 select * from Employees;
 

INSERT INTO Department (depart_id,depart_name, depart_city) 
VALUES 
       ('d_1','CS','Islamabad'),
       ('d_2','SE','CALIFORNIA'),
       ('d_3','Tax','Atlanta'),
       ('d_4','IT','Boston'),
       ('d_5','Networking','Johannesburg'),
       ('d_6','Admin','Atlanta');
       select * from Department;
       
INSERT INTO Salaries( salary_id, salary_pa) 
VALUES
      ('s_1',18000000),
      ('s_2',23000000),
      ('s_3',7500000),
      ('s_4',9900000),
      ('s_5',9000000),
      ('s_6',12000000);
     select * from salaries;
INSERT INTO Roles (role_id, role)
values 
       ('r_1','Analyst'),
       ('r_2','Saleman'),
       ('r_3','Clerk'),
       ('r_4','Programmer'),
       ('r_5','Manager'),
       ('r_6','Finance');
       
       select * from Roles;
INSERT INTO Overtime_Hours (Overtime_id, overtime_hours)
VALUES
      ('hr_1',0),
      ('hr_2',16),
      ('hr_3',10);
      SELECT * FROM Overtime_Hours;
      
 -----LEFT JOINT------      
   SELECT ED.depart_name AS DEPARTMENT, ER.role AS JOB_TITLE, ES.salary_pa AS FIGURE_SALARY, EH.overtime_hours AS HOURS
   FROM Employees AS EM
   LEFT JOIN Department AS ED 
   ON EM.depart_id = ED.depart_id
   LEFT JOIN Roles AS ER
   ON EM.role_id = ER.role_id
   LEFT JOIN Salaries AS ES
   ON EM.salary_id = ES.salary_id
   LEFT JOIN Overtime_Hours AS EH
   ON EM.overtime_id = EH.overtime_id;
    
    