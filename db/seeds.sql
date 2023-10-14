INSERT INTO departments (department) 
VALUES ("sales"),("engineering"),("finance"),("accounting"),("legal");

INSERT INTO roles (title, department, salary) 
VALUES ("VP", "sales", 100000), ("salesperson", "sales", 60000), ("vp","engineering", 120000),  ("engineer", "engineering", 70000), ("president", "finance", 250000), ("finance person", "finance", 80000), ("VP", "accounting", 120000), ("accountant", "accounting", 75000), ("president", "legal", 280000), ("intern", "legal", 30000);

INSERT INTO employees (first_name, last_name, title, department, salary, manager) 
VALUES ("erica", "jenk", "VP", "sales", 100000, "null"), ("will", "fish", "salesperson", "sales", 60000, "erica jenk"), ("holly", "smalls", "vp","engineering", 120000, "null"), ("lily", "sash", "engineer", "engineering", 70000, "holly smalls"), ("will", "tonkel","president", "finance", 250000, "null"), ("peter", "large", "finance person", "finance", 80000, "will tonkel"), ("jackie", "meyers", "VP", "accounting", 120000, "null"), ("josh", "modra", "accountant", "accounting", 75000, "jackie meyers"), ("john", "smith", "president", "legal", 280000, "null"), ("josh", "actry", "intern", "legal", 30000, "john smith");


