import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../../../shared/errors/AppError';
/**
 * Aqui usamos a mesma interface do repository e do Model
 * Mas tentar criar uma unica interface para os 3 arquivos pode atrapalhar
 * Pode ter dados que o repository vai receber mas o service não
 * "Tentar otimizar, refatorar demais prematuramente pode atrapalhar lá na frente"
 * Nem sempre é ruim repetir código.
 */
interface Request {
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
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
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
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
