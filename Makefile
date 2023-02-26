POSTGRES+="postgresql://postgres:postgres@localhost:5111/postgres?sslmode=disable"

schema_name=new_gold
create_sql='CREATE SCHEMA ${schema_name};'

create_shema: 
	psql ${POSTGRES} -c 'CREATE SCHEMA ${schema_name};'

migrate_up: create_shema
	migrate -path database/migrations/ -database ${POSTGRES} -verbose up
	@echo "Migrate up done!"

migrate_down: 
	migrate -path database/migrations/ -database ${POSTGRES} -verbose down

migrate_fix: 
	migrate -path database/migrations/ -database ${POSTGRES} force 1

drop_schema: migrate_down
	psql ${POSTGRES} -c 'DROP SCHEMA IF EXISTS ${schema_name} CASCADE;'