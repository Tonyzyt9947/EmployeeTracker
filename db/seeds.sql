INSERT INTO departments (name)
VALUES  ("Literature"),
        ("Physics"),
        ("Philosophy");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Head of Literature", 200000, 1),
        ("Literature Professor", 150000, 1),
        ("Writing Assistant", 75000, 1),
        ("Head of Physics", 200000, 2),
        ("Physics Professor", 150000, 2),
        ("Lab Director", 100000, 2),
        ("Head of Philosophy", 200000, 3),
        ("Philosophy Professor", 150000, 3);    

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Fyodor", "Dostoevsky", 1, null),
        ("Marcel", "Proust", 2, 1),
        ("Virginia", "Woolf", 2, 1),
        ("Ernest", "Hemingway", 2, 1),
        ("George", "Orwell", 3, 1),
        ("Franz", "Kafka", 3, 1),
        ("Albert", "Einstein", 4, null),
        ("Werner", "Heisenberg", 5, 7),
        ("Richard", "Feynman", 5, 7),
        ("Paul", "Dirac", 5, 7),
        ("Nikola", "Tesla", 6, 7),
        ("Martin", "Heidegger", 7, null),
        ("Friedrich", "Nietzsche", 8, 12),
        ("Emil", "Cioran", 8, 12);