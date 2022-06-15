import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false, name: 'livros' })
export default class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  titulo: string;

  @Column({ type: 'varchar', nullable: false })
  autor: string;

  @Column('text')
  sinopse: string;
}
