import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1770191785802 implements MigrationInterface {
    name = 'InitialSchema1770191785802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."members_payment_method_enum" AS ENUM('CASH', 'CARD', 'TRANSFER')`);
        await queryRunner.query(`CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "birth_date" date NOT NULL, "birth_place" character varying(255) NOT NULL, "address" text NOT NULL, "email" character varying(255), "phone" character varying(50), "photo_url" character varying(500), "member_number" character varying(50) NOT NULL, "membership_date" date NOT NULL, "tomite_id" uuid NOT NULL, "original_tomite_id" uuid NOT NULL, "has_paid" boolean NOT NULL DEFAULT false, "payment_method" "public"."members_payment_method_enum", "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bab9dbf94db02b1b0dd63846071" UNIQUE ("member_number"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_members_number" ON "members" ("member_number") `);
        await queryRunner.query(`CREATE INDEX "idx_members_search" ON "members" ("first_name", "last_name") `);
        await queryRunner.query(`CREATE INDEX "idx_members_tomite" ON "members" ("tomite_id") `);
        await queryRunner.query(`CREATE TYPE "public"."invitation_role_enum" AS ENUM('BOARD', 'TOMITE_PRESIDENT', 'SECRETARY')`);
        await queryRunner.query(`CREATE TABLE "invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "token" character varying(255) NOT NULL, "expires_at" TIMESTAMP NOT NULL, "role" "public"."invitation_role_enum" NOT NULL, "tomite_id" uuid NOT NULL, "created_by" uuid NOT NULL, "used_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e577dcf9bb6d084373ed3998509" UNIQUE ("token"), CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_invitations_token" ON "invitations" ("token") `);
        await queryRunner.query(`CREATE TABLE "tomites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(4) NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9653d06907ebf2720bde40367c5" UNIQUE ("code"), CONSTRAINT "PK_a50a905debf6a5c60c20a4efbe7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_tomites_code" ON "tomites" ("code") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BOARD', 'TOMITE_PRESIDENT', 'SECRETARY')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'SECRETARY', "tomite_id" uuid, "is_active" boolean NOT NULL DEFAULT true, "member_id" uuid, "invited_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_930e69d96a9cf9bdc32b7a49db" UNIQUE ("member_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_email" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_c2f79643cc1cf7e72f5bc0db786" FOREIGN KEY ("tomite_id") REFERENCES "tomites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_24c9efb07b69ea9a6a441f716d4" FOREIGN KEY ("original_tomite_id") REFERENCES "tomites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_1483c0dffef166307ccb4675a3a" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_8dd585f3e9a4d108d380ddf2648" FOREIGN KEY ("tomite_id") REFERENCES "tomites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_2afdbc73ee1fe16cf1f3929e920" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_63719c11d1a5062a15a11e467a2" FOREIGN KEY ("tomite_id") REFERENCES "tomites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_930e69d96a9cf9bdc32b7a49db1" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d2dbc280ebc69071c0846c87019" FOREIGN KEY ("invited_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d2dbc280ebc69071c0846c87019"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_930e69d96a9cf9bdc32b7a49db1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_63719c11d1a5062a15a11e467a2"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_2afdbc73ee1fe16cf1f3929e920"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_8dd585f3e9a4d108d380ddf2648"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_1483c0dffef166307ccb4675a3a"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_24c9efb07b69ea9a6a441f716d4"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_c2f79643cc1cf7e72f5bc0db786"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_email"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tomites_code"`);
        await queryRunner.query(`DROP TABLE "tomites"`);
        await queryRunner.query(`DROP INDEX "public"."idx_invitations_token"`);
        await queryRunner.query(`DROP TABLE "invitations"`);
        await queryRunner.query(`DROP TYPE "public"."invitation_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_members_tomite"`);
        await queryRunner.query(`DROP INDEX "public"."idx_members_search"`);
        await queryRunner.query(`DROP INDEX "public"."idx_members_number"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TYPE "public"."members_payment_method_enum"`);
    }

}
