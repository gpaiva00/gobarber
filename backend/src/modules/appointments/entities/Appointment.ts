import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../users/entities/User';

// entity é uma funcao e com os decorators podemos chama-la e passar como parametro a nossa classe
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // por padrao o parametro é do tipo varchar
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  /**
   * Serve para quando instanciar o appointment (new Appointment())
   * possa passar parametors
   * para criar o Appointment com informacoes pre existentes
   */
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.provider = provider;
  //   this.date = date;
  //   this.id = uuid();
  // }
}

export default Appointment;
