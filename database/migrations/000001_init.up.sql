BEGIN;

SET search_path = public, new_gold;

CREATE ROLE postgrest_authenticator noinherit LOGIN PASSWORD 'qwerty12345';
GRANT usage ON SCHEMA new_gold TO postgrest_authenticator;

CREATE ROLE postgrest_anon nologin;
GRANT usage ON SCHEMA new_gold TO postgrest_anon;
GRANT postgrest_anon TO postgrest_authenticator;

CREATE ROLE postgrest_user nologin;
GRANT usage ON SCHEMA new_gold TO postgrest_user;
GRANT postgrest_user TO postgrest_authenticator;

CREATE TABLE new_gold.users (
    id uuid PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	username text UNIQUE NOT NULL,
	password text NOT NULL,
	email text UNIQUE NOT NULL,
    last_login TIMESTAMP
);
GRANT SELECT ON new_gold.users TO postgrest_user;
GRANT SELECT, UPDATE, INSERT, DELETE ON new_gold.users to postgrest_authenticator;

COMMIT;