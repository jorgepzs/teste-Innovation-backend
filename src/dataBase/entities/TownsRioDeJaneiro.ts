import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";


@Entity("towns_rj")
export class TownsRJ {
  @PrimaryColumn("integer")
  id: number;

  @Column({ type: "text", unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
