import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTweets1597189301799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tweets',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'text_content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'media_content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'retweets',
            type: 'integer',
            default: 0,
            isNullable: false,
          },
          {
            name: 'comments',
            type: 'integer',
            default: 0,
            isNullable: false,
          },
          {
            name: 'likes',
            type: 'integer',
            default: 0,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
