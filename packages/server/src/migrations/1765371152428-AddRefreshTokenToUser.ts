import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRefreshTokenToUser1765371152428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "users",
          new TableColumn({
            name: "refreshTokenHash",
            type: "text",
            isNullable: true,
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "refreshTokenHash");
      }
}
