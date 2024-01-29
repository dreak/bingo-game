import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'game_room' })
export class GameRoom {
  @PrimaryGeneratedColumn({ name: 'game_room_id' })
  gameRoomId: number;
  @Column({ name: 'room_identifier' })
  roomIdentifier: string;
  @Column({ name: 'master_code' })
  masterCode: string;
  @Column({ name: 'game_size' })
  gameSize: number;
  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;
  @UpdateDateColumn({ name: 'modified_date' })
  modified_date: Date;
}
