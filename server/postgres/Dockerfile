FROM postgres:latest

# docker-entrypoint-initdb.d is a folder that contain sql files 
# to be executed the first time the database is created
ADD extentions.sql /docker-entrypoint-initdb.d/
ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/