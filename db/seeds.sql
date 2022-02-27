INSERT INTO department(name)
VALUES
    ('Executive'),
    ('Human Resources'),
    ('Sales'),
    ('Marketing'),
    ('Lifestyle');

INSERT INTO role(title, salary, department_id)
VALUES
     ('President/CEO', '250000', 1),
     ('Director of HR', '130000', 2),
     ('HR Coordinator', '75000', 2),
     ('Director of Sales', '175000', 3),
     ('Sales Manager', '100000', 3),
     ('Salesperson', '80000', 3),
     ('Director of Marketing', '125000', 4),
     ('Marketing Coordinator', '85000', 4),
     ('Marketing Intern', '30000', 4),
     ('Director of Lifestyle', '125000', 5),
     ('Content Creator', '65000', 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Lindsey', 'Davis', 1, NULL),
('Allison', 'Kirk', 2, 1),
('Matt', 'Smith', 3, 2),
('William', 'Patrick', 4, 3),
('Kathleen', 'Kiley', 4, 3),
('Justin', 'Love', 5, 1),
('Burton', 'Leon', 5, 2);