BEGIN TRANSACTION;

CREATE TABLE login(
    id uuid DEFAULT uuid_generate_v4(),
    hash VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

COMMIT;