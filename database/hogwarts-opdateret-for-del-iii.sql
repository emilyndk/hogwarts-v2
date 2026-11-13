--
-- PostgreSQL database dump
--

\restrict EybuW3v43TjHyhoIbKjetko28gPKcmAbEWbbYb4vxXWB9O0coiIeotb27gFz4gx

-- Dumped from database version 18.6 (Homebrew)
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-12 20:13:14 CET

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

--
-- TOC entry 6 (class 2615 OID 16608)
-- Name: exams; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA exams;


ALTER SCHEMA exams OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16423)
-- Name: course_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_students (
    fk_courses integer NOT NULL,
    fk_students integer NOT NULL
);


ALTER TABLE public.course_students OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16428)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    course_name character varying(120) NOT NULL,
    fk_teachers integer NOT NULL,
    type character varying(50),
    level character varying(50),
    school_year integer
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16434)
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
-- TOC entry 234 (class 1259 OID 16622)
-- Name: exams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exams (
    exam_id integer NOT NULL,
    course_id integer NOT NULL,
    student_id integer NOT NULL,
    grade_id integer NOT NULL
);


ALTER TABLE public.exams OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16625)
-- Name: exams_exam_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.exams ALTER COLUMN exam_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exams_exam_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16605)
-- Name: grades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    letter character varying(5) NOT NULL,
    name character varying(20) NOT NULL,
    description text NOT NULL,
    fail_or_pass character varying(20) NOT NULL
);


ALTER TABLE public.grades OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16609)
-- Name: grades_grade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.grades ALTER COLUMN grade_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.grades_grade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16435)
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
-- TOC entry 225 (class 1259 OID 16442)
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
-- TOC entry 230 (class 1259 OID 16506)
-- Name: potions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.potions (
    id integer NOT NULL,
    potion_name text NOT NULL,
    brewing_time_mins integer NOT NULL,
    difficulty text NOT NULL
);


ALTER TABLE public.potions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16515)
-- Name: potions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.potions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.potions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16443)
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
-- TOC entry 227 (class 1259 OID 16450)
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
-- TOC entry 228 (class 1259 OID 16451)
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    teacher_name character varying(80) NOT NULL,
    fk_house integer NOT NULL,
    employment_start date,
    currently_active boolean,
    deceased boolean
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16457)
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
-- TOC entry 220 (class 1259 OID 16390)
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
    id bigint
);


ALTER TABLE public.test OWNER TO postgres;

--
-- TOC entry 3906 (class 0 OID 16423)
-- Dependencies: 221
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
-- TOC entry 3907 (class 0 OID 16428)
-- Dependencies: 222
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (7, 'Transfiguration', 1, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (6, 'Potions', 2, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (1, 'Herbology', 5, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (2, 'History of Magic', 6, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (4, 'Astronomy', 7, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (8, 'Flying', 11, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (5, 'Defence Against the Dark Arts (DADA)', 12, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (3, 'Charms', 2, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (14, 'efhkw', 2, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (15, 'efhkw', 2, NULL, NULL, NULL);
INSERT INTO public.courses OVERRIDING SYSTEM VALUE VALUES (17, 'ok', 2, NULL, NULL, NULL);


--
-- TOC entry 3919 (class 0 OID 16622)
-- Dependencies: 234
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3917 (class 0 OID 16605)
-- Dependencies: 232
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3909 (class 0 OID 16435)
-- Dependencies: 224
-- Data for Name: houses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (1, 'Gryffindor', 'Red', 'Godric Gryffindor');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (2, 'Hufflepuff', 'Yellow', 'Helga Hufflepuff');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (3, 'Ravenclaw', 'Blue', 'Rowena Ravenclaw');
INSERT INTO public.houses OVERRIDING SYSTEM VALUE VALUES (4, 'Slytherin', 'Green', 'Salazar Slytherin');


--
-- TOC entry 3915 (class 0 OID 16506)
-- Dependencies: 230
-- Data for Name: potions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3911 (class 0 OID 16443)
-- Dependencies: 226
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
-- TOC entry 3913 (class 0 OID 16451)
-- Dependencies: 228
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (8, 'Alastor "Mad-Eye" Moody', 1, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (12, 'Remus Lupin', 1, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (2, 'Severus Snape', 2, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (3, 'Horace Slughorn', 2, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (9, 'Dolores Umbridge', 2, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (4, 'Filius Flitwick', 3, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (6, 'Cuthbert Binns', 3, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (7, 'Aurora Sinistra', 3, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (10, 'Wilkie Twycross', 1, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (5, 'Pomona Sprout', 4, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (11, 'Rolanda Hooch', 4, NULL, NULL, NULL);
INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (1, 'McGonnagall', 3, NULL, NULL, NULL);


--
-- TOC entry 3905 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3926 (class 0 OID 0)
-- Dependencies: 223
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 17, true);


--
-- TOC entry 3927 (class 0 OID 0)
-- Dependencies: 235
-- Name: exams_exam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exams_exam_id_seq', 1, false);


--
-- TOC entry 3928 (class 0 OID 0)
-- Dependencies: 233
-- Name: grades_grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grades_grade_id_seq', 1, false);


--
-- TOC entry 3929 (class 0 OID 0)
-- Dependencies: 225
-- Name: houses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.houses_id_seq', 4, true);


--
-- TOC entry 3930 (class 0 OID 0)
-- Dependencies: 231
-- Name: potions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.potions_id_seq', 1, false);


--
-- TOC entry 3931 (class 0 OID 0)
-- Dependencies: 227
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 29, true);


--
-- TOC entry 3932 (class 0 OID 0)
-- Dependencies: 229
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 17, true);


--
-- TOC entry 3735 (class 2606 OID 16459)
-- Name: course_students course_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_pkey PRIMARY KEY (fk_courses, fk_students);


--
-- TOC entry 3737 (class 2606 OID 16461)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3749 (class 2606 OID 16634)
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (exam_id);


--
-- TOC entry 3747 (class 2606 OID 16621)
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);


--
-- TOC entry 3739 (class 2606 OID 16463)
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- TOC entry 3745 (class 2606 OID 16517)
-- Name: potions potions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.potions
    ADD CONSTRAINT potions_pkey PRIMARY KEY (id);


--
-- TOC entry 3741 (class 2606 OID 16465)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3743 (class 2606 OID 16467)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 3750 (class 2606 OID 16468)
-- Name: course_students course_students_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_course_id_fkey FOREIGN KEY (fk_courses) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 3751 (class 2606 OID 16473)
-- Name: course_students course_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_student_id_fkey FOREIGN KEY (fk_students) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- TOC entry 3755 (class 2606 OID 16635)
-- Name: exams exams_courses_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_courses_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 3756 (class 2606 OID 16645)
-- Name: exams exams_grades_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_grades_fk FOREIGN KEY (grade_id) REFERENCES public.grades(grade_id) ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 3757 (class 2606 OID 16640)
-- Name: exams exams_students_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_students_fk FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3752 (class 2606 OID 16478)
-- Name: courses fk_courses_teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk_courses_teacher FOREIGN KEY (fk_teachers) REFERENCES public.teachers(id);


--
-- TOC entry 3753 (class 2606 OID 16483)
-- Name: students fk_students_house; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_students_house FOREIGN KEY (fk_house) REFERENCES public.houses(id);


--
-- TOC entry 3754 (class 2606 OID 16488)
-- Name: teachers fk_teachers_house; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT fk_teachers_house FOREIGN KEY (fk_house) REFERENCES public.houses(id);


-- Completed on 2026-11-12 20:13:14 CET

--
-- PostgreSQL database dump complete
--

\unrestrict EybuW3v43TjHyhoIbKjetko28gPKcmAbEWbbYb4vxXWB9O0coiIeotb27gFz4gx

