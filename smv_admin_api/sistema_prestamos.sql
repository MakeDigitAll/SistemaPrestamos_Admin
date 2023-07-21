--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-20 19:39:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 239 (class 1259 OID 40298)
-- Name: PrestamosUsuariosAfiliados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrestamosUsuariosAfiliados" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idUsuarioAfiliado" integer NOT NULL,
    "idPrestamo" integer NOT NULL
);


ALTER TABLE public."PrestamosUsuariosAfiliados" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 40283)
-- Name: PrestamosUsuariosPrestamistas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrestamosUsuariosPrestamistas" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    "idPrestamo" integer NOT NULL
);


ALTER TABLE public."PrestamosUsuariosPrestamistas" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 40122)
-- Name: administradores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administradores (
    "idAdministrador" integer NOT NULL,
    "correoElectronico" character varying(255) NOT NULL,
    "adminPassword" character varying(255) NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "isDeleted" boolean DEFAULT false,
    "isModified" boolean DEFAULT false
);


ALTER TABLE public.administradores OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 40121)
-- Name: administradores_idAdministrador_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."administradores_idAdministrador_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."administradores_idAdministrador_seq" OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 216
-- Name: administradores_idAdministrador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."administradores_idAdministrador_seq" OWNED BY public.administradores."idAdministrador";


--
-- TOC entry 215 (class 1259 OID 37452)
-- Name: calidadPrestamista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."calidadPrestamista" (
    "idCalidadPrestamista" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    "montoDesde" numeric NOT NULL,
    "montoHasta" numeric NOT NULL,
    "numeroUsuarios" numeric NOT NULL,
    "nombreNivel" character varying(255) NOT NULL,
    "costoMembresia" numeric
);


ALTER TABLE public."calidadPrestamista" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 37451)
-- Name: calidadPrestamista_idCalidadPrestamista_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."calidadPrestamista_idCalidadPrestamista_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."calidadPrestamista_idCalidadPrestamista_seq" OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 214
-- Name: calidadPrestamista_idCalidadPrestamista_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."calidadPrestamista_idCalidadPrestamista_seq" OWNED BY public."calidadPrestamista"."idCalidadPrestamista";


--
-- TOC entry 231 (class 1259 OID 40227)
-- Name: datosUsuarioSuscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."datosUsuarioSuscripciones" (
    "idDatosUsuarioSuscripcion" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    "montoAPrestarDesde" numeric NOT NULL,
    "montoAPrestarHasta" numeric NOT NULL,
    "numeroUsuarios" numeric NOT NULL,
    "antiguedadMeses" numeric NOT NULL,
    "pagosAlCorriente" boolean NOT NULL
);


ALTER TABLE public."datosUsuarioSuscripciones" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 40226)
-- Name: datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq" OWNER TO postgres;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 230
-- Name: datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq" OWNED BY public."datosUsuarioSuscripciones"."idDatosUsuarioSuscripcion";


--
-- TOC entry 223 (class 1259 OID 40161)
-- Name: imagenAdministradores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."imagenAdministradores" (
    "idImagen" integer NOT NULL,
    "idAdministrador" integer NOT NULL,
    imagen bytea
);


ALTER TABLE public."imagenAdministradores" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 40160)
-- Name: imagenAdministradores_idImagen_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."imagenAdministradores_idImagen_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imagenAdministradores_idImagen_seq" OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 222
-- Name: imagenAdministradores_idImagen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."imagenAdministradores_idImagen_seq" OWNED BY public."imagenAdministradores"."idImagen";


--
-- TOC entry 227 (class 1259 OID 40189)
-- Name: imagenAfiliados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."imagenAfiliados" (
    "idImagen" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    imagen bytea,
    "idUsuarioAfiliado" integer
);


ALTER TABLE public."imagenAfiliados" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 40188)
-- Name: imagenAfiliados_idImagen_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."imagenAfiliados_idImagen_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imagenAfiliados_idImagen_seq" OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 226
-- Name: imagenAfiliados_idImagen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."imagenAfiliados_idImagen_seq" OWNED BY public."imagenAfiliados"."idImagen";


--
-- TOC entry 225 (class 1259 OID 40175)
-- Name: imagenPrestamistas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."imagenPrestamistas" (
    "idImagen" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    imagen bytea
);


ALTER TABLE public."imagenPrestamistas" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 40174)
-- Name: imagenPrestamistas_idImagen_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."imagenPrestamistas_idImagen_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imagenPrestamistas_idImagen_seq" OWNER TO postgres;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 224
-- Name: imagenPrestamistas_idImagen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."imagenPrestamistas_idImagen_seq" OWNED BY public."imagenPrestamistas"."idImagen";


--
-- TOC entry 233 (class 1259 OID 40241)
-- Name: nivelesFidelidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."nivelesFidelidad" (
    "idNivelFidelidad" integer NOT NULL,
    "nombreNivelFidelidad" character varying(255) NOT NULL,
    descuento integer NOT NULL,
    "numeroMesesMinimo" integer NOT NULL,
    "numeroMesesMaximo" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "isUpdated" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."nivelesFidelidad" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 40240)
-- Name: nivelesFidelidad_idNivelFidelidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."nivelesFidelidad_idNivelFidelidad_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."nivelesFidelidad_idNivelFidelidad_seq" OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 232
-- Name: nivelesFidelidad_idNivelFidelidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."nivelesFidelidad_idNivelFidelidad_seq" OWNED BY public."nivelesFidelidad"."idNivelFidelidad";


--
-- TOC entry 229 (class 1259 OID 40208)
-- Name: prestamos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prestamos (
    "idPrestamo" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    "idUsuarioAfiliado" integer NOT NULL,
    "montoPrestado" numeric NOT NULL,
    "montoPorPagar" numeric NOT NULL,
    "tasaInteres" numeric NOT NULL,
    "fechaPrestamo" timestamp with time zone NOT NULL,
    "fechaProximoPago" timestamp with time zone NOT NULL,
    "fechaFinPago" timestamp with time zone NOT NULL,
    "historialPagos" character varying(255) NOT NULL,
    "estadoPrestamo" character varying(255) NOT NULL
);


ALTER TABLE public.prestamos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 40207)
-- Name: prestamos_idPrestamo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."prestamos_idPrestamo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."prestamos_idPrestamo_seq" OWNER TO postgres;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 228
-- Name: prestamos_idPrestamo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."prestamos_idPrestamo_seq" OWNED BY public.prestamos."idPrestamo";


--
-- TOC entry 237 (class 1259 OID 40261)
-- Name: suscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscripciones (
    "idSuscripcion" integer NOT NULL,
    "idUsuarioPrestamista" integer NOT NULL,
    "idNivelFidelidad" integer NOT NULL,
    "idTipoSuscripcion" integer NOT NULL,
    "fechaInicio" timestamp with time zone NOT NULL,
    "fechaFin" timestamp with time zone NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.suscripciones OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 40260)
-- Name: suscripciones_idSuscripcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."suscripciones_idSuscripcion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."suscripciones_idSuscripcion_seq" OWNER TO postgres;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 236
-- Name: suscripciones_idSuscripcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."suscripciones_idSuscripcion_seq" OWNED BY public.suscripciones."idSuscripcion";


--
-- TOC entry 235 (class 1259 OID 40250)
-- Name: tipoSuscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tipoSuscripciones" (
    "idTipoSuscripcion" integer NOT NULL,
    "nombreSuscripcion" character varying(255) NOT NULL,
    "montoDesde" numeric NOT NULL,
    "montoHasta" numeric NOT NULL,
    "numeroUsuariosMax" numeric NOT NULL,
    "costoMembresia" numeric NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "isUpdated" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."tipoSuscripciones" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 40249)
-- Name: tipoSuscripciones_idTipoSuscripcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tipoSuscripciones_idTipoSuscripcion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."tipoSuscripciones_idTipoSuscripcion_seq" OWNER TO postgres;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipoSuscripciones_idTipoSuscripcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tipoSuscripciones_idTipoSuscripcion_seq" OWNED BY public."tipoSuscripciones"."idTipoSuscripcion";


--
-- TOC entry 221 (class 1259 OID 40147)
-- Name: usuariosAfiliados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."usuariosAfiliados" (
    "idUsuarioAfiliado" integer NOT NULL,
    "correoElectronico" character varying(255) NOT NULL,
    "usuarioPassword" character varying(255) NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    "numeroTelefono" character varying(255) NOT NULL,
    "isActive" boolean DEFAULT false,
    "codigoReferencia" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "isDeleted" boolean DEFAULT false,
    "isModified" boolean DEFAULT false,
    "isPasswordChanged" boolean DEFAULT false,
    "isEmailConfirmed" boolean DEFAULT false
);


ALTER TABLE public."usuariosAfiliados" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 40146)
-- Name: usuariosAfiliados_idUsuarioAfiliado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."usuariosAfiliados_idUsuarioAfiliado_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."usuariosAfiliados_idUsuarioAfiliado_seq" OWNER TO postgres;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuariosAfiliados_idUsuarioAfiliado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."usuariosAfiliados_idUsuarioAfiliado_seq" OWNED BY public."usuariosAfiliados"."idUsuarioAfiliado";


--
-- TOC entry 219 (class 1259 OID 40133)
-- Name: usuariosPrestamistas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."usuariosPrestamistas" (
    "idUsuarioPrestamista" integer NOT NULL,
    "correoElectronico" character varying(255) NOT NULL,
    "usuarioPassword" character varying(255) NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    "numeroTelefono" character varying(255),
    "isActive" boolean DEFAULT false,
    "codigoReferencia" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "isDeleted" boolean DEFAULT false,
    "isModified" boolean DEFAULT false,
    "isPasswordChanged" boolean DEFAULT false,
    "isEmailConfirmed" boolean DEFAULT false
);


ALTER TABLE public."usuariosPrestamistas" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 40132)
-- Name: usuariosPrestamistas_idUsuarioPrestamista_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."usuariosPrestamistas_idUsuarioPrestamista_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."usuariosPrestamistas_idUsuarioPrestamista_seq" OWNER TO postgres;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuariosPrestamistas_idUsuarioPrestamista_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."usuariosPrestamistas_idUsuarioPrestamista_seq" OWNED BY public."usuariosPrestamistas"."idUsuarioPrestamista";


--
-- TOC entry 3237 (class 2604 OID 40125)
-- Name: administradores idAdministrador; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administradores ALTER COLUMN "idAdministrador" SET DEFAULT nextval('public."administradores_idAdministrador_seq"'::regclass);


--
-- TOC entry 3236 (class 2604 OID 37455)
-- Name: calidadPrestamista idCalidadPrestamista; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calidadPrestamista" ALTER COLUMN "idCalidadPrestamista" SET DEFAULT nextval('public."calidadPrestamista_idCalidadPrestamista_seq"'::regclass);


--
-- TOC entry 3256 (class 2604 OID 40230)
-- Name: datosUsuarioSuscripciones idDatosUsuarioSuscripcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."datosUsuarioSuscripciones" ALTER COLUMN "idDatosUsuarioSuscripcion" SET DEFAULT nextval('public."datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq"'::regclass);


--
-- TOC entry 3252 (class 2604 OID 40164)
-- Name: imagenAdministradores idImagen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAdministradores" ALTER COLUMN "idImagen" SET DEFAULT nextval('public."imagenAdministradores_idImagen_seq"'::regclass);


--
-- TOC entry 3254 (class 2604 OID 40192)
-- Name: imagenAfiliados idImagen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAfiliados" ALTER COLUMN "idImagen" SET DEFAULT nextval('public."imagenAfiliados_idImagen_seq"'::regclass);


--
-- TOC entry 3253 (class 2604 OID 40178)
-- Name: imagenPrestamistas idImagen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenPrestamistas" ALTER COLUMN "idImagen" SET DEFAULT nextval('public."imagenPrestamistas_idImagen_seq"'::regclass);


--
-- TOC entry 3257 (class 2604 OID 40244)
-- Name: nivelesFidelidad idNivelFidelidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."nivelesFidelidad" ALTER COLUMN "idNivelFidelidad" SET DEFAULT nextval('public."nivelesFidelidad_idNivelFidelidad_seq"'::regclass);


--
-- TOC entry 3255 (class 2604 OID 40211)
-- Name: prestamos idPrestamo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos ALTER COLUMN "idPrestamo" SET DEFAULT nextval('public."prestamos_idPrestamo_seq"'::regclass);


--
-- TOC entry 3263 (class 2604 OID 40264)
-- Name: suscripciones idSuscripcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones ALTER COLUMN "idSuscripcion" SET DEFAULT nextval('public."suscripciones_idSuscripcion_seq"'::regclass);


--
-- TOC entry 3260 (class 2604 OID 40253)
-- Name: tipoSuscripciones idTipoSuscripcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tipoSuscripciones" ALTER COLUMN "idTipoSuscripcion" SET DEFAULT nextval('public."tipoSuscripciones_idTipoSuscripcion_seq"'::regclass);


--
-- TOC entry 3246 (class 2604 OID 40150)
-- Name: usuariosAfiliados idUsuarioAfiliado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."usuariosAfiliados" ALTER COLUMN "idUsuarioAfiliado" SET DEFAULT nextval('public."usuariosAfiliados_idUsuarioAfiliado_seq"'::regclass);


--
-- TOC entry 3240 (class 2604 OID 40136)
-- Name: usuariosPrestamistas idUsuarioPrestamista; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."usuariosPrestamistas" ALTER COLUMN "idUsuarioPrestamista" SET DEFAULT nextval('public."usuariosPrestamistas_idUsuarioPrestamista_seq"'::regclass);


--
-- TOC entry 3474 (class 0 OID 40298)
-- Dependencies: 239
-- Data for Name: PrestamosUsuariosAfiliados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PrestamosUsuariosAfiliados" ("createdAt", "updatedAt", "idUsuarioAfiliado", "idPrestamo") FROM stdin;
\.


--
-- TOC entry 3473 (class 0 OID 40283)
-- Dependencies: 238
-- Data for Name: PrestamosUsuariosPrestamistas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PrestamosUsuariosPrestamistas" ("createdAt", "updatedAt", "idUsuarioPrestamista", "idPrestamo") FROM stdin;
\.


--
-- TOC entry 3452 (class 0 OID 40122)
-- Dependencies: 217
-- Data for Name: administradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administradores ("idAdministrador", "correoElectronico", "adminPassword", nombres, apellidos, "createdAt", "updatedAt", "isDeleted", "isModified") FROM stdin;
\.


--
-- TOC entry 3450 (class 0 OID 37452)
-- Dependencies: 215
-- Data for Name: calidadPrestamista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."calidadPrestamista" ("idCalidadPrestamista", "idUsuarioPrestamista", "montoDesde", "montoHasta", "numeroUsuarios", "nombreNivel", "costoMembresia") FROM stdin;
1	1	1000	10000	100	tier1	\N
2	2	1000	10000	100	tier1	\N
3	3	1000	10000	100	tier1	\N
4	4	1000	10000	100	tier1	\N
\.


--
-- TOC entry 3466 (class 0 OID 40227)
-- Dependencies: 231
-- Data for Name: datosUsuarioSuscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."datosUsuarioSuscripciones" ("idDatosUsuarioSuscripcion", "idUsuarioPrestamista", "montoAPrestarDesde", "montoAPrestarHasta", "numeroUsuarios", "antiguedadMeses", "pagosAlCorriente") FROM stdin;
\.


--
-- TOC entry 3458 (class 0 OID 40161)
-- Dependencies: 223
-- Data for Name: imagenAdministradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."imagenAdministradores" ("idImagen", "idAdministrador", imagen) FROM stdin;
\.


--
-- TOC entry 3462 (class 0 OID 40189)
-- Dependencies: 227
-- Data for Name: imagenAfiliados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."imagenAfiliados" ("idImagen", "idUsuarioPrestamista", imagen, "idUsuarioAfiliado") FROM stdin;
\.


--
-- TOC entry 3460 (class 0 OID 40175)
-- Dependencies: 225
-- Data for Name: imagenPrestamistas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."imagenPrestamistas" ("idImagen", "idUsuarioPrestamista", imagen) FROM stdin;
\.


--
-- TOC entry 3468 (class 0 OID 40241)
-- Dependencies: 233
-- Data for Name: nivelesFidelidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."nivelesFidelidad" ("idNivelFidelidad", "nombreNivelFidelidad", descuento, "numeroMesesMinimo", "numeroMesesMaximo", "isDeleted", "isUpdated") FROM stdin;
\.


--
-- TOC entry 3464 (class 0 OID 40208)
-- Dependencies: 229
-- Data for Name: prestamos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prestamos ("idPrestamo", "idUsuarioPrestamista", "idUsuarioAfiliado", "montoPrestado", "montoPorPagar", "tasaInteres", "fechaPrestamo", "fechaProximoPago", "fechaFinPago", "historialPagos", "estadoPrestamo") FROM stdin;
\.


--
-- TOC entry 3472 (class 0 OID 40261)
-- Dependencies: 237
-- Data for Name: suscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suscripciones ("idSuscripcion", "idUsuarioPrestamista", "idNivelFidelidad", "idTipoSuscripcion", "fechaInicio", "fechaFin", "isActive") FROM stdin;
\.


--
-- TOC entry 3470 (class 0 OID 40250)
-- Dependencies: 235
-- Data for Name: tipoSuscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."tipoSuscripciones" ("idTipoSuscripcion", "nombreSuscripcion", "montoDesde", "montoHasta", "numeroUsuariosMax", "costoMembresia", "isDeleted", "isUpdated") FROM stdin;
\.


--
-- TOC entry 3456 (class 0 OID 40147)
-- Dependencies: 221
-- Data for Name: usuariosAfiliados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."usuariosAfiliados" ("idUsuarioAfiliado", "correoElectronico", "usuarioPassword", nombres, apellidos, "numeroTelefono", "isActive", "codigoReferencia", "createdAt", "updatedAt", "isDeleted", "isModified", "isPasswordChanged", "isEmailConfirmed") FROM stdin;
\.


--
-- TOC entry 3454 (class 0 OID 40133)
-- Dependencies: 219
-- Data for Name: usuariosPrestamistas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."usuariosPrestamistas" ("idUsuarioPrestamista", "correoElectronico", "usuarioPassword", nombres, apellidos, "numeroTelefono", "isActive", "codigoReferencia", "createdAt", "updatedAt", "isDeleted", "isModified", "isPasswordChanged", "isEmailConfirmed") FROM stdin;
\.


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 216
-- Name: administradores_idAdministrador_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."administradores_idAdministrador_seq"', 1, false);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 214
-- Name: calidadPrestamista_idCalidadPrestamista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."calidadPrestamista_idCalidadPrestamista_seq"', 4, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 230
-- Name: datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."datosUsuarioSuscripciones_idDatosUsuarioSuscripcion_seq"', 1, false);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 222
-- Name: imagenAdministradores_idImagen_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."imagenAdministradores_idImagen_seq"', 1, false);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 226
-- Name: imagenAfiliados_idImagen_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."imagenAfiliados_idImagen_seq"', 1, false);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 224
-- Name: imagenPrestamistas_idImagen_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."imagenPrestamistas_idImagen_seq"', 1, false);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 232
-- Name: nivelesFidelidad_idNivelFidelidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."nivelesFidelidad_idNivelFidelidad_seq"', 1, false);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 228
-- Name: prestamos_idPrestamo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."prestamos_idPrestamo_seq"', 1, false);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 236
-- Name: suscripciones_idSuscripcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."suscripciones_idSuscripcion_seq"', 1, false);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipoSuscripciones_idTipoSuscripcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tipoSuscripciones_idTipoSuscripcion_seq"', 1, false);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuariosAfiliados_idUsuarioAfiliado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."usuariosAfiliados_idUsuarioAfiliado_seq"', 1, false);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuariosPrestamistas_idUsuarioPrestamista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."usuariosPrestamistas_idUsuarioPrestamista_seq"', 1, false);


--
-- TOC entry 3292 (class 2606 OID 40302)
-- Name: PrestamosUsuariosAfiliados PrestamosUsuariosAfiliados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosAfiliados"
    ADD CONSTRAINT "PrestamosUsuariosAfiliados_pkey" PRIMARY KEY ("idUsuarioAfiliado", "idPrestamo");


--
-- TOC entry 3290 (class 2606 OID 40287)
-- Name: PrestamosUsuariosPrestamistas PrestamosUsuariosPrestamistas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosPrestamistas"
    ADD CONSTRAINT "PrestamosUsuariosPrestamistas_pkey" PRIMARY KEY ("idUsuarioPrestamista", "idPrestamo");


--
-- TOC entry 3268 (class 2606 OID 40131)
-- Name: administradores administradores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_pkey PRIMARY KEY ("idAdministrador");


--
-- TOC entry 3266 (class 2606 OID 37459)
-- Name: calidadPrestamista calidadPrestamista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calidadPrestamista"
    ADD CONSTRAINT "calidadPrestamista_pkey" PRIMARY KEY ("idCalidadPrestamista");


--
-- TOC entry 3282 (class 2606 OID 40234)
-- Name: datosUsuarioSuscripciones datosUsuarioSuscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."datosUsuarioSuscripciones"
    ADD CONSTRAINT "datosUsuarioSuscripciones_pkey" PRIMARY KEY ("idDatosUsuarioSuscripcion");


--
-- TOC entry 3274 (class 2606 OID 40168)
-- Name: imagenAdministradores imagenAdministradores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAdministradores"
    ADD CONSTRAINT "imagenAdministradores_pkey" PRIMARY KEY ("idImagen");


--
-- TOC entry 3278 (class 2606 OID 40196)
-- Name: imagenAfiliados imagenAfiliados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAfiliados"
    ADD CONSTRAINT "imagenAfiliados_pkey" PRIMARY KEY ("idImagen");


--
-- TOC entry 3276 (class 2606 OID 40182)
-- Name: imagenPrestamistas imagenPrestamistas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenPrestamistas"
    ADD CONSTRAINT "imagenPrestamistas_pkey" PRIMARY KEY ("idImagen");


--
-- TOC entry 3284 (class 2606 OID 40248)
-- Name: nivelesFidelidad nivelesFidelidad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."nivelesFidelidad"
    ADD CONSTRAINT "nivelesFidelidad_pkey" PRIMARY KEY ("idNivelFidelidad");


--
-- TOC entry 3280 (class 2606 OID 40215)
-- Name: prestamos prestamos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_pkey PRIMARY KEY ("idPrestamo");


--
-- TOC entry 3288 (class 2606 OID 40267)
-- Name: suscripciones suscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_pkey PRIMARY KEY ("idSuscripcion");


--
-- TOC entry 3286 (class 2606 OID 40259)
-- Name: tipoSuscripciones tipoSuscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tipoSuscripciones"
    ADD CONSTRAINT "tipoSuscripciones_pkey" PRIMARY KEY ("idTipoSuscripcion");


--
-- TOC entry 3272 (class 2606 OID 40159)
-- Name: usuariosAfiliados usuariosAfiliados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."usuariosAfiliados"
    ADD CONSTRAINT "usuariosAfiliados_pkey" PRIMARY KEY ("idUsuarioAfiliado");


--
-- TOC entry 3270 (class 2606 OID 40145)
-- Name: usuariosPrestamistas usuariosPrestamistas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."usuariosPrestamistas"
    ADD CONSTRAINT "usuariosPrestamistas_pkey" PRIMARY KEY ("idUsuarioPrestamista");


--
-- TOC entry 3305 (class 2606 OID 40308)
-- Name: PrestamosUsuariosAfiliados PrestamosUsuariosAfiliados_idPrestamo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosAfiliados"
    ADD CONSTRAINT "PrestamosUsuariosAfiliados_idPrestamo_fkey" FOREIGN KEY ("idPrestamo") REFERENCES public.prestamos("idPrestamo") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3306 (class 2606 OID 40303)
-- Name: PrestamosUsuariosAfiliados PrestamosUsuariosAfiliados_idUsuarioAfiliado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosAfiliados"
    ADD CONSTRAINT "PrestamosUsuariosAfiliados_idUsuarioAfiliado_fkey" FOREIGN KEY ("idUsuarioAfiliado") REFERENCES public."usuariosAfiliados"("idUsuarioAfiliado") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3303 (class 2606 OID 40293)
-- Name: PrestamosUsuariosPrestamistas PrestamosUsuariosPrestamistas_idPrestamo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosPrestamistas"
    ADD CONSTRAINT "PrestamosUsuariosPrestamistas_idPrestamo_fkey" FOREIGN KEY ("idPrestamo") REFERENCES public.prestamos("idPrestamo") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3304 (class 2606 OID 40288)
-- Name: PrestamosUsuariosPrestamistas PrestamosUsuariosPrestamistas_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestamosUsuariosPrestamistas"
    ADD CONSTRAINT "PrestamosUsuariosPrestamistas_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosPrestamistas"("idUsuarioPrestamista") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3299 (class 2606 OID 40235)
-- Name: datosUsuarioSuscripciones datosUsuarioSuscripciones_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."datosUsuarioSuscripciones"
    ADD CONSTRAINT "datosUsuarioSuscripciones_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosPrestamistas"("idUsuarioPrestamista") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3293 (class 2606 OID 40169)
-- Name: imagenAdministradores imagenAdministradores_idAdministrador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAdministradores"
    ADD CONSTRAINT "imagenAdministradores_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES public.administradores("idAdministrador") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3295 (class 2606 OID 40202)
-- Name: imagenAfiliados imagenAfiliados_idUsuarioAfiliado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAfiliados"
    ADD CONSTRAINT "imagenAfiliados_idUsuarioAfiliado_fkey" FOREIGN KEY ("idUsuarioAfiliado") REFERENCES public."usuariosAfiliados"("idUsuarioAfiliado") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3296 (class 2606 OID 40197)
-- Name: imagenAfiliados imagenAfiliados_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenAfiliados"
    ADD CONSTRAINT "imagenAfiliados_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosAfiliados"("idUsuarioAfiliado");


--
-- TOC entry 3294 (class 2606 OID 40183)
-- Name: imagenPrestamistas imagenPrestamistas_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."imagenPrestamistas"
    ADD CONSTRAINT "imagenPrestamistas_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosPrestamistas"("idUsuarioPrestamista") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3297 (class 2606 OID 40221)
-- Name: prestamos prestamos_idUsuarioAfiliado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT "prestamos_idUsuarioAfiliado_fkey" FOREIGN KEY ("idUsuarioAfiliado") REFERENCES public."usuariosAfiliados"("idUsuarioAfiliado");


--
-- TOC entry 3298 (class 2606 OID 40216)
-- Name: prestamos prestamos_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT "prestamos_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosPrestamistas"("idUsuarioPrestamista");


--
-- TOC entry 3300 (class 2606 OID 40273)
-- Name: suscripciones suscripciones_idNivelFidelidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT "suscripciones_idNivelFidelidad_fkey" FOREIGN KEY ("idNivelFidelidad") REFERENCES public."nivelesFidelidad"("idNivelFidelidad") ON UPDATE CASCADE;


--
-- TOC entry 3301 (class 2606 OID 40278)
-- Name: suscripciones suscripciones_idTipoSuscripcion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT "suscripciones_idTipoSuscripcion_fkey" FOREIGN KEY ("idTipoSuscripcion") REFERENCES public."tipoSuscripciones"("idTipoSuscripcion") ON UPDATE CASCADE;


--
-- TOC entry 3302 (class 2606 OID 40268)
-- Name: suscripciones suscripciones_idUsuarioPrestamista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT "suscripciones_idUsuarioPrestamista_fkey" FOREIGN KEY ("idUsuarioPrestamista") REFERENCES public."usuariosPrestamistas"("idUsuarioPrestamista") ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-07-20 19:39:39

--
-- PostgreSQL database dump complete
--

