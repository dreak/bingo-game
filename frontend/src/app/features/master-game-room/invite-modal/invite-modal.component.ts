import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'bingo-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss']
})
export class InviteModalComponent {
  @Input() inviteLink: string;

  constructor(
    private readonly modal: NzModalRef,
    private readonly messageService: NzMessageService,
    private readonly clipboardService: ClipboardService
  ) {}

  onCopyLink() {
    this.clipboardService.copy(this.inviteLink);
    this.messageService.success('Invitation link copied', {
      nzDuration: 1000
    });
  }
}
