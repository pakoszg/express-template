# Express.js general template
with postgREST and postgreSQL

## How to start?

1. Run `docker compose up` from the /docker directory
2. Run `make migrate_up` from /root to set up a schema and migrations
3. Run `npm run start` from the /express dir to start the server

To test it, create a user by pasting the following cURL to the terminal:
```
curl --request POST \
  --url http://localhost:8000/user/create \
  --header 'Content-Type: application/json' \
  --data '{
	"id": "8350c44b-326d-4664-b8b6-f74aaacc3058",
	"created_at": "2023-04-08T14:15:49.223Z",
	"username": "testUser",
	"password": "testPassword",
	"email": "random123@pg.com"
}'
```
