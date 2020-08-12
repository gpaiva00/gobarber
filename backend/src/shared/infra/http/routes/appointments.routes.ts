import { Router } from 'express';
// parseISo converte uma data em string para um formato date do JS (Date)
// startOfHour: pega uma data e coloca o minuto como 0, e segundos como 0 (pega só a hora)
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
/**
 * SoC: Separação de preocupações
 * A rota não ficar preocupada com a regra de negocio, aonde os dados serão salvos,
 * como a resposta deve ser retornada para o client
 * Ela deve ter uma unica preocupação
 */

/**
 * Arquitetura de software
 * DTO: Data Transfer Object
 * Transmitir dados de um arquivo para outro
 * Pra transmitir dado de um arquivo para outro é bom usar objeto
 */

/**
 * Rotas devem se preocupar com:
 * Receber a requisição,
 * chamar o arquivo responsavel por tratar essa requisição
 * retornar uma resposta ao client
 * Lógica e regras de negócio devem ficar nos services
 */

/**
 * o Servico deve ter uma unica e exclusiva funcionalidade
 */

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  // O ts já identifica o tipo dessa variável parsedDate como Date
  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const CreateAppointmentService = new CreateAppointmentsService(
    appointmentsRepository,
  );

  const appointment = await CreateAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
