import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false, name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;
}
