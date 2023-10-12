DROP DATABASE IF EXISTS business_db;
-- Creates the "business_db_db" database --
CREATE DATABASE business_db;

-- Use business_db database --
USE business_db;

CREATE TABLE departments (
  -- Creates a numeric column called "id" --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "DEPARTMENT" which cannot contain null --
  department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  -- Creates a numeric column called "id" --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL
);

CREATE TABLE employees (
  -- Creates a numeric column called "id" --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  manager VARCHAR(30)
);