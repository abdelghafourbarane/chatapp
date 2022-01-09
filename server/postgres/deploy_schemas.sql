-- Deploy fresh database tables and extentions creation
\i 'docker-entrypoint-initdb.d/extentions.sql'
\i 'docker-entrypoint-initdb.d/tables/users.sql'
\i 'docker-entrypoint-initdb.d/tables/login.sql'
