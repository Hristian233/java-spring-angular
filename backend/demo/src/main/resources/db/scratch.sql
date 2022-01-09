CREATE TABLE IF NOT EXISTS public.cars
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    price numeric(19,2) NOT NULL,
    views bigint,
    CONSTRAINT cars_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.user_roles
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    authority character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    account_non_expired boolean NOT NULL,
    account_non_locked boolean NOT NULL,
    credentials_non_expired boolean NOT NULL,
    enabled boolean NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6 UNIQUE (username)
)

CREATE TABLE IF NOT EXISTS public.users_roles
(
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkfivrl5i32jkvd1w39y4h2vn90 FOREIGN KEY (role_id)
        REFERENCES public.user_roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)