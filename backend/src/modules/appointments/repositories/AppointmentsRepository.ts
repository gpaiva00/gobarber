import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
/** arquivo responsavel por tudo que vai mexer nos agendamentos da nossa aplicaçµao
 * ler, alterar, deletar, buscar, criar
 * Como sendo o detendor das operacoes de Agendamento, em cima dos dados da nossa aplicacao
 * os repositoroes vao ser repsonsaveis por fazer esas operacoes
 * assim a rota vai perdendo mais responsabilidades
 * */

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // apenas o repositorio seja o responsasvel os trabalhar os dados desse
  // nunca deixar os dados mantidos pelo repositorio disponivel fora do escopo

  /**
   * findByDate
   * verifica se há um agendamento com a mesma data enviada pelo usuário
   * se não encontrar ele retorna false
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
