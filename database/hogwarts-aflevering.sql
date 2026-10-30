--
-- PostgreSQL database dump
--

\restrict GgOnWzG4AcNPV6cePT825fpw0cM8vugfXY1AU2C2qT6kMOlZP2eCt4CieQQcmWh

-- Dumped from database version 18.6 (Homebrew)
-- Dumped by pg_dump version 18.6

-- Started on 2026-10-30 21:03:15 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16423)
-- Name: course_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_students (
    fk_courses integer NOT NULL,
    fk_students integer NOT NULL
);


ALTER TABLE public.course_students OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16428)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    course_name character varying(120) NOT NULL,
    fk_teachers integer NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16434)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.courses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16435)
-- Name: houses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.houses (
    id integer NOT NULL,
    house_name character varying(60) NOT NULL,
    house_color character varying(20) NOT NULL,
    house_founder character varying(60) NOT NULL
);


ALTER TABLE public.houses OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16442)
-- Name: houses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.houses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.houses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16443)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    student_name character varying(80) NOT NULL,
    fk_house integer NOT NULL,
    student_year integer NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16450)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 16451)
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    teacher_name character varying(80) NOT NULL,
    fk_house integer NOT NULL
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16457)
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.teachers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16390)
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
    id bigint
);


ALTER TABLE public.test OWNER TO postgres;

--
-- TOC entry 3881 (class 0 OID 16423)
-- Dependencies: 220
-- Data for Name: course_students; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.course_students VALUES (7, 2);
INSERT INTO public.course_students VALUES (2, 2);
INSERT INTO public.course_students VALUES (7, 3);
INSERT INTO public.course_students VALUES (2, 3);
INSERT INTO public.course_students VALUES (7, 4);
INSERT INTO public.course_students VALUES (2, 4);
INSERT INTO public.course_students VALUES (7, 5);
INSERT INTO public.course_students VALUES (2, 5);
INSERT INTO public.course_students VALUES (7, 6);
INSERT INTO public.course_students VALUES (2, 6);
INSERT INTO public.course_students VALUES (7, 7);
INSERT INTO public.course_students VALUES (2, 7);
INSERT INTO public.course_students VALUES (7, 8);
INSERT INTO public.course_students VALUES (2, 8);
INSERT INTO public.course_students VALUES (7, 9);
INSERT INTO public.course_students VALUES (2, 9);
INSERT INTO public.course_students VALUES (7, 10);
INSERT INTO public.course_students VALUES (2, 10);
INSERT INTO public.course_students VALUES (7, 11);
INSERT INTO public.course_students VALUES (2, 11);
INSERT INTO public.course_students VALUES (7, 12);
INSERT INTO public.course_students VALUES (2, 12);
INSERT INTO public.course_students VALUES (7, 13);
INSERT INTO public.course_students VALUES (2, 13);
INSERT INTO public.course_students VALUES (7, 14);
INSERT INTO public.course_students VALUES (2, 14);
INSERT INTO public.course_students VALUES (7, 15);
INSERT INTO public.course_students VALUES (2, 15);
INSERT INTO public.course_students VALUES (7, 16);
INSERT INTO public.course_students VALUES (2, 16);
INSERT INTO public.course_students VALUES (7, 17);
INSERT INTO public.course_students VALUES (2, 17);
INSERT INTO public.course_students VALUES (7, 18);
INSERT INTO public.course_students VALUES (2, 18);
INSERT INTO public.course_students VALUES (7, 19);
INSERT INTO public.course_students VALUES (2, 19);
INSERT INTO public.course_students VALUES (7, 20);
INSERT INTO public.course_students VALUES (2, 20);
INSERT INTO public.course_students VALUES (1, 2);


--
-- TOC entry 3882 (class 0 OID 16428)
-- Dependencies: 221
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (7, 'Transfiguration', 1);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (6, 'Potions', 2);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (1, 'Herbology', 5);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (2, 'History of Magic', 6);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (4, 'Astronomy', 7);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (8, 'Flying', 11);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (5, 'Defence Against the Dark Arts (DADA)', 12);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (3, 'Charms', 2);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (14, 'efhkw', 2);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (15, 'efhkw', 2);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (17, 'ok', 2);


--
-- TOC entry 3884 (class 0 OID 16435)
-- Dependencies: 223
-- Data for Name: houses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (1, 'Gryffindor', 'Red', 'Godric Gryffindor');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (2, 'Hufflepuff', 'Yellow', 'Helga Hufflepuff');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (3, 'Ravenclaw', 'Blue', 'Rowena Ravenclaw');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (4, 'Slytherin', 'Green', 'Salazar Slytherin');


--
-- TOC entry 3886 (class 0 OID 16443)
-- Dependencies: 225
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (1, 'Harry Potter', 1, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (2, 'Hermione Granger', 1, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (3, 'Ron Weasley', 1, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (4, 'Neville Longbottom', 1, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (7, 'Hannah Abbott', 4, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (8, 'Ernie Macmillan', 4, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (9, 'Susan Bones', 4, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (10, 'Justin Finch-Fletchley', 4, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (13, 'Padma Patil', 3, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (14, 'Michael Corner', 3, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (15, 'Terry Boot', 3, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (16, 'Draco Malfoy', 2, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (17, 'Pansy Parkinson', 2, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (18, 'Blaise Zabini', 2, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (19, 'Gregory Goyle', 2, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (20, 'Vincent Crabbe', 2, 4);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (5, 'Ginny Weasley', 1, 3);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (11, 'Luna Lovegood', 3, 3);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (6, 'Cedric Diggory', 4, 6);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (12, 'Cho Chang', 3, 5);


--
-- TOC entry 3888 (class 0 OID 16451)
-- Dependencies: 227
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (8, 'Alastor "Mad-Eye" Moody', 1);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (12, 'Remus Lupin', 1);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (2, 'Severus Snape', 2);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (3, 'Horace Slughorn', 2);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (9, 'Dolores Umbridge', 2);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (4, 'Filius Flitwick', 3);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (6, 'Cuthbert Binns', 3);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (7, 'Aurora Sinistra', 3);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (10, 'Wilkie Twycross', 1);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (5, 'Pomona Sprout', 4);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (11, 'Rolanda Hooch', 4);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (1, 'McGonnagall', 3);


--
-- TOC entry 3880 (class 0 OID 16390)
-- Dependencies: 219
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 222
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 17, true);


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 224
-- Name: houses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.houses_id_seq', 4, true);


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 226
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 29, true);


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 228
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 17, true);


--
-- TOC entry 3719 (class 2606 OID 16459)
-- Name: course_students course_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_pkey PRIMARY KEY (fk_courses, fk_students);


--
-- TOC entry 3721 (class 2606 OID 16461)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3723 (class 2606 OID 16463)
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- TOC entry 3725 (class 2606 OID 16465)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3727 (class 2606 OID 16467)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 3728 (class 2606 OID 16468)
-- Name: course_students course_students_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_course_id_fkey FOREIGN KEY (fk_courses) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 3729 (class 2606 OID 16473)
-- Name: course_students course_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_student_id_fkey FOREIGN KEY (fk_students) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- TOC entry 3730 (class 2606 OID 16478)
-- Name: courses fk_courses_teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk_courses_teacher FOREIGN KEY (fk_teachers) REFERENCES public.teachers(id);


--
-- TOC entry 3731 (class 2606 OID 16483)
-- Name: students fk_students_house; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_students_house FOREIGN KEY (fk_house) REFERENCES public.houses(id);


--
-- TOC entry 3732 (class 2606 OID 16488)
-- Name: teachers fk_teachers_house; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT fk_teachers_house FOREIGN KEY (fk_house) REFERENCES public.houses(id);


-- Completed on 2026-10-30 21:03:15 CET

--
-- PostgreSQL database dump complete
--

\unrestrict GgOnWzG4AcNPV6cePT825fpw0cM8vugfXY1AU2C2qT6kMOlZP2eCt4CieQQcmWh

