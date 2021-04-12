DROP TABLE IF EXISTS singhealth_institutions CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS new_audit CASCADE;
DROP TABLE IF EXISTS staff cascade; 
DROP TABLE IF EXISTS checklist cascade;
DROP TABLE IF EXISTS audit_in_progress cascade;
DROP TABLE IF EXISTS tenant cascade;
DROP TABLE IF EXISTS past_audits cascade;
DROP TABLE IF EXISTS resolved_audits cascade;
DROP TABLE IF EXISTS images cascade;
DROP TABLE IF EXISTS update_compliance cascade;
DROP TABLE IF EXISTS institute_monthly cascade;
DROP TABLE IF EXISTS resolve_compliance cascade;
DROP TABLE IF EXISTS checklistfb cascade;
DROP TABLE IF EXISTS checklistnonfb cascade;
DROP TABLE IF EXISTS stores cascade ;

CREATE TABLE stores(
    store_id serial primary key,
    store_name text
);

CREATE TABLE singhealth_institutions(
    institution_id serial PRIMARY KEY, 
    institution_name VARCHAR(50) UNIQUE NOT NULL
);

-- FB and non_fb for tenant checklist
CREATE TABLE category(
    category_ID serial PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);

--group the following into categories for the respective checklist FB and non fb
CREATE TABLE checklistfb(
    fb_id serial PRIMARY KEY,
    category_ID integer references category
    ON DELETE CASCADE,
    fb_cat_name text unique not null
);

create table checklistnonfb(
    nonfb_id serial PRIMARY KEY,
    category_ID integer references category
    ON DELETE CASCADE,
    nonfb_cat_name text unique not null
);

CREATE TABLE staff(
    staff_id serial PRIMARY KEY,
    staff_name VARCHAR (50) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    institution_id integer not null,
   CONSTRAINT fk_Institution
      FOREIGN KEY(institution_id)
          REFERENCES singhealth_institutions(institution_id)
          ON DELETE CASCADE,
    password varchar(100),
    token text
);

-- On registration
CREATE TABLE tenant(
    tenant_id serial PRIMARY KEY, 
    tenant_name varchar(50),
    category_ID integer,
    store_des VARCHAR(250),
    email TEXT UNIQUE NOT NULL,
    CONSTRAINT fk_cat
    FOREIGN KEY(category_ID)
        REFERENCES category(category_ID)
        ON DELETE CASCADE
    , 
    expiry_date date,
    password varchar(100),
    store_name text unique,
    institution_id integer references singhealth_institutions,
    token text
);


CREATE TABLE new_audit(
    resolve_status boolean,
    Audit_ID serial PRIMARY KEY,
    aud_score integer,
    date_record date, 
    inst_id integer,
    category_ID integer,
    CONSTRAINT fk_cat
    FOREIGN KEY(category_ID)
        REFERENCES category(category_ID)
        ON DELETE CASCADE,
    tenant_id integer references tenant,
    noncompliances json
);

-- contains each and every checklist id that is passed here
--front end to call this checklist
CREATE TABLE checklist(
    checklist_id serial primary key,
    category_ID integer,
    check_name varchar,
    CONSTRAINT fk_category_id
    FOREIGN KEY (category_ID)
        REFERENCES category(category_ID)
        ON DELETE CASCADE
);

CREATE TABLE audit_in_progress(
     audit_date date,
     aud_score integer,
     noncompliances json not null,
     category_ID integer references category
     ON DELETE CASCADE,
     audit_id integer references new_audit
     ON DELETE CASCADE,
     tenant_id integer references tenant
     ON DELETE CASCADE
);

CREATE TABLE past_audits(
    audit_id integer references new_audit
    ON DELETE CASCADE,
    aud_score integer,
    tenant_id integer references tenant
    ON DELETE CASCADE,
    audit_date date,
    updates json not null               
);

--storage of the image in the blob format
--resolving of the images
CREATE TABLE images(
    img_id serial primary key,
    imgname text 
);

--for tenants to resolve
CREATE TABLE update_compliance(
    checklist_id integer references checklist,
    dateline date,
    img_id integer references images
    ON DELETE CASCADE,
    resolve_status boolean
);

CREATE TABLE resolved_audits(
    audit_id integer references new_audit
    ON DELETE CASCADE,
    resolve_status boolean CHECK (resolve_status = true)
);

CREATE TABLE institute_monthly(
    aud_month varchar,
    inst_id integer references singhealth_institutions
    ON DELETE CASCADE,
    avg_score integer
);

--for staff to resolve the compliance for the tenant
CREATE TABLE resolve_compliance(
    aud_id integer references singhealth_institutions
    ON DELETE CASCADE,
    checklist_id integer references checklist
    ON DELETE CASCADE,
    resolve_status boolean
);

--INSERT commands for the hardcoded ones
INSERT INTO category(category_name) values('FB'),('Non_FB');

-- set the category at the backend if category = 1, then add to checklist 
-- else non fb
-- NOTE Only fb is completed!
INSERT INTO checklistfb(category_ID,fb_cat_name) values
(1,'professionalism'),
(1,'staff hygiene'),
(1,'environment_cleanliness'),
(1,'hand_hygiene'),
(1,'storage_prep_food'),
(1,'storage_refrigerator_warmer'),
(1,'food'),
(1,'beverage'),
(1,'general_safety'),
(1,'fire'),
(1,'electrical');

INSERT INTO checklistnonfb(category_ID,nonfb_cat_name) values
(2,'professionalism'),
(2,'staff_hygiene'),
(2,'environment cleanliness');

--CREATE A list of institutions involved 
INSERT INTO singhealth_institutions(institution_name) values
('CGH'),('KKH'),('SGH'),('SKH'),('NCCS'),('NDCS'),('NHCS'),('SNEC'),('BVH'),
('OCH'),('Academia');
