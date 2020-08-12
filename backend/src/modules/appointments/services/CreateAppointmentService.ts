import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
/**
 * O service não precisa saber se estamos usando typeorm ou mongoose
 * Precisamos tirar essa responsabilidade dele
 */

/**
 * Aqui usamos a mesma interface do repository e do Model
 * Mas tentar criar uma unica interface para os 3 arquivos pode atrapalhar
 * Pode ter dados que o repository vai receber mas o service não
 * "Tentar otimizar, refatorar demais prematuramente pode atrapalhar lá na frente"
 * Nem sempre é ruim repetir código.
 */
interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  /**
   * Depedency Inversion (SOLID)
   *
   */
  /**
   * execute ou run
   * Vai executar a criacão de um novo appointment
   * No geral deve ter apenas um metodo
   */

  /**
   * Service
   * Recebe informações
   * Trata erros/excessões
   * Acesso ao repositorio
   */

  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    /**
     * Estamos usando parametros nomeados
     * Assim, se não passarmos algum, vamos saber QUAL está faltando
     * Se passar cada argumento separado por virgula (não nomeado)
     * Ele daria apenas o erro de "tem algum parametro faltando"
     */
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
