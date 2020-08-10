import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterFieldProviderToProviderId1588382697065
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        // Se o provider for deletado, atualizamos o seu id nos agendamentos para NULL
        onDelete: 'SET NULL',
        // Se por alguma razão do Universo o id do provider for alterado,
        // atualizamos também nos seus agendamentos
        onUpdate: 'CASCADE',
      }),
    );

    /**
     * tecnica de CASCADE no sql
     * Permitir que um agendamento não tenha um provider?
     * O que fazer quando um provider for deletado? Apagar tambem num efeito cascata
     * todos os seus agendamentos?
     * Nessa caso vamos deixar o provider_id como NULL
     * para que os clientes não fiquem sem seus agendamentos
     */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
