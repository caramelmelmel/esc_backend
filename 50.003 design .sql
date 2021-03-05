CREATE TABLE "Staff" (
  "Staff_ID" integer PRIMARY KEY,
  "name" varchar,
  "email" email,
  "Inst_ID" integer
);

CREATE TABLE "Audit_in_progress" (
  "Tenant_ID" integer,
  "date_recorded" date,
  "Audit_ID" integer
);

CREATE TABLE "Tenants" (
  "Tenant_ID" integer PRIMARY KEY,
  "name" varchar,
  "email" email,
  "date_end" date,
  "store_name" String,
  "category_ID" String,
  "Description" String
);

CREATE TABLE "Audit_score" (
  "Audit_ID" integer,
  "Tenant_ID" integer,
  "aud_score" integer,
  "aud_date" datetime
);

CREATE TABLE "New_Audit" (
  "resolve_status" varbinary,
  "Audit_ID" integer PRIMARY KEY,
  "aud_score" integer,
  "date_recorded" datetime,
  "Inst_ID" integer,
  "Institution_name" String,
  "category_ID" integer
);

CREATE TABLE "Checklist" (
  "Tenant_ID" integer,
  "Eval_ID" integer,
  "criteria" String,
  "Checklist_id" integer PRIMARY KEY,
  "score_each_check" integer,
  "pic_ID" integer
);

CREATE TABLE "past_audits" (
  "Audit_ID" integer,
  "date_recorded" datetime,
  "Tenant_ID" integer,
  "Tenant_name" String
);

CREATE TABLE "picture" (
  "pic_ID" integer PRIMARY KEY,
  "timestamp" datetime,
  "image" blob,
  "caption" String,
  "due_date" datetime,
  "Checklist_id" integer
);

CREATE TABLE "audits_review" (
  "Checklist_id" integer,
  "Tenant_ID" integer,
  "update_ID" integer PRIMARY KEY,
  "Audit_ID" integer,
  "closed" varbinary,
  "comments" String
);

CREATE TABLE "Updates_req" (
  "update_ID" integer,
  "Tenant_ID" integer,
  "Checklist_id" integer,
  "num_notif" integer,
  "comments" String
);

CREATE TABLE "Eval_Type" (
  "Eval_ID" integer PRIMARY KEY,
  "Eval_type" String
);

CREATE TABLE "category" (
  "category_ID" varchar PRIMARY KEY,
  "category_name" varchar
);

CREATE TABLE "Institution_across" (
  "Inst_ID" integer,
  "month" String,
  "audit_score" int
);

CREATE TABLE "Institute_compilation_within" (
  "Inst_ID" integer,
  "Tenant_ID" integer,
  "audit_score_store" integer,
  "month" String,
  "Audit_ID" integer
);

CREATE TABLE "Singhealth_Institutes" (
  "Inst_ID" integer PRIMARY KEY,
  "aud_score_avg" integer,
  "month" String
);

ALTER TABLE "Audit_in_progress" ADD FOREIGN KEY ("Audit_ID") REFERENCES "New_Audit" ("Audit_ID");

ALTER TABLE "Audit_in_progress" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "Audit_score" ADD FOREIGN KEY ("Audit_ID") REFERENCES "New_Audit" ("Audit_ID");

ALTER TABLE "Audit_score" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "past_audits" ADD FOREIGN KEY ("Audit_ID") REFERENCES "New_Audit" ("Audit_ID");

ALTER TABLE "past_audits" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "Checklist" ADD FOREIGN KEY ("Eval_ID") REFERENCES "Eval_Type" ("Eval_ID");

ALTER TABLE "Checklist" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "New_Audit" ADD FOREIGN KEY ("category_ID") REFERENCES "category" ("category_ID");

ALTER TABLE "New_Audit" ADD FOREIGN KEY ("Inst_ID") REFERENCES "Singhealth_Institutes" ("Inst_ID");

ALTER TABLE "Tenants" ADD FOREIGN KEY ("category_ID") REFERENCES "category" ("category_ID");

ALTER TABLE "Checklist" ADD FOREIGN KEY ("pic_ID") REFERENCES "picture" ("pic_ID");

ALTER TABLE "Institution_across" ADD FOREIGN KEY ("Inst_ID") REFERENCES "Singhealth_Institutes" ("Inst_ID");

ALTER TABLE "Institute_compilation_within" ADD FOREIGN KEY ("Inst_ID") REFERENCES "Singhealth_Institutes" ("Inst_ID");

ALTER TABLE "Institute_compilation_within" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "Institute_compilation_within" ADD FOREIGN KEY ("Audit_ID") REFERENCES "New_Audit" ("Audit_ID");

ALTER TABLE "picture" ADD FOREIGN KEY ("Checklist_id") REFERENCES "Checklist" ("Checklist_id");

ALTER TABLE "Updates_req" ADD FOREIGN KEY ("update_ID") REFERENCES "audits_review" ("update_ID");

ALTER TABLE "Updates_req" ADD FOREIGN KEY ("Tenant_ID") REFERENCES "Tenants" ("Tenant_ID");

ALTER TABLE "Updates_req" ADD FOREIGN KEY ("Checklist_id") REFERENCES "Checklist" ("Checklist_id");

ALTER TABLE "Staff" ADD FOREIGN KEY ("Inst_ID") REFERENCES "Singhealth_Institutes" ("Inst_ID");
