import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['TODO', 'DOING', 'DONE'],
    default: 'TODO',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  user_id: number;
}
