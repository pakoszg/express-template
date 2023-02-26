BEGIN;

SET search_path = public, new_gold;

CREATE TABLE new_gold.users (
    id uuid PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	username text UNIQUE NOT NULL,
	password text NOT NULL,
	email text UNIQUE NOT NULL,
    last_login TIMESTAMP
);

COMMIT;