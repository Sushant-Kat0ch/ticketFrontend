import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {
  ticketData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {
    this.ticketData = data;
  }

  onClickDelete() {
    this.ticketService.deleteTicket(this.ticketData.id).subscribe(
      (res) => {
        console.log('deleted successfully')
        this.ticketService.getAllTicket();
      }
    )

  }

}
