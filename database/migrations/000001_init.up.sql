BEGIN;

SET search_path = public, new_gold;

DROP ROLE IF EXISTS postgrest_anon, postgrest_authenticator, postgrest_user;

CREATE ROLE postgrest_authenticator noinherit LOGIN PASSWORD 'qwerty12345';
GRANT USAGE ON SCHEMA new_gold TO postgrest_authenticator;

CREATE ROLE postgrest_anon nologin;
GRANT USAGE ON SCHEMA new_gold TO postgrest_anon;
GRANT postgrest_anon TO postgrest_authenticator;

CREATE ROLE postgrest_user nologin;
GRANT USAGE ON SCHEMA new_gold TO postgrest_user;
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