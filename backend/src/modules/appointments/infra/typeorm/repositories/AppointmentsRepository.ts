import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';
/** arquivo responsavel por tudo que vai mexer nos agendamentos da nossa aplicaçµao
 * ler, alterar, deletar, buscar, criar
 * Como sendo o detendor das operacoes de Agendamento, em cima dos dados da nossa aplicacao
 * os repositoroes vao ser repsonsaveis por fazer esas operacoes
 * assim a rota vai perdendo mais responsabilidades
 * */

class AppointmentsRepository implements IAppointmentsRepository {
  // apenas o repositorio seja o responsasvel os trabalhar os dados desse
  // nunca deixar os dados mantidos pelo repositorio disponivel fora do escopo

  /**
   * findByDate
   * verifica se há um agendamento com a mesma data enviada pelo usuário
   * se não encontrar ele retorna false
   */
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
