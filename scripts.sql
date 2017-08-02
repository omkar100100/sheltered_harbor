DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('Tyler', 'Shih-tzu', 3, 'M');

DROP DATABASE IF EXISTS seltered_harbor;
CREATE DATABASE seltered_harbor;

CREATE SEQUENCE admin_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE admins_id_seq
  OWNER TO postgres;

  CREATE TABLE admin
(
  id integer NOT NULL DEFAULT nextval('admin_id_seq'::regclass),
  "username" character varying(255),
  password character varying(255),
  "createdAt" timestamp with time zone ,
  "updatedAt" timestamp with time zone,
  CONSTRAINT admins_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE admin
  OWNER TO postgres;


  INSERT INTO admins(
            id, "userName", password, "createdAt", "updatedAt")
    VALUES (?, ?, ?, ?, ?);