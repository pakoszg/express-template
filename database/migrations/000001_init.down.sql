BEGIN;

DROP ROLE IF EXISTS postgrest_anon, postgrest_authenticator, postgrest_user;

DROP TABLE new_gold.users;

COMMIT;