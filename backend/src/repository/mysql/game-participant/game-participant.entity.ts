import { BettingWinningNumberDto } from '@repository/mysql/game-participant/betting-winning-number.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'game_participant' })
export class GameParticipant {
  @PrimaryGeneratedColumn({ name: 'game_participant_id' })
  gameParticipantId: number;
  @Column({ name: 'game_room_id' })
  gameRoomId: number;
  @Column({ name: 'user_identifier' })
  userIdentifier: string;
  @Column({ name: 'user_name' })
  userName: string;
  @Column({ name: 'betting_number', type: 'json', nullable: true })
  bettingNumber: BettingWinningNumberDto[] | null;
  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;
  @UpdateDateColumn({ name: 'modified_date' })
  modified_date: Date;
}
