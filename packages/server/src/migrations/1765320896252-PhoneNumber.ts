import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPhoneNumberToUsers1700000000000 implements MigrationInterface {
  name = "AddPhoneNumberToUsers1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "phoneNumber",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "phoneNumber");
  }
}
