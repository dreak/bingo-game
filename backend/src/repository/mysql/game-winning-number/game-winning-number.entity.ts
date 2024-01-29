import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'game_winning_number' })
export class GameWinningNumber {
  @PrimaryGeneratedColumn({ name: 'game_winning_number_id' })
  gameWinningNumberId: number;
  @Column({ name: 'game_room_id' })
  gameRoomId: number;
  @Column({ name: 'winning_number' })
  winningNumber: number;
  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;
  @UpdateDateColumn({ name: 'modified_date' })
  modified_date: Date;
}
