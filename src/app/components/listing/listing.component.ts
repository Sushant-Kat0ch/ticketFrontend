import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketService } from '../../services/ticket.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {

  constructor(
    public dialog: MatDialog,
    private ticketService: TicketService,
  ) {}

  tickets : any

  getAllTickets(){
    this.ticketService.getAllTicket()
    this.ticketService.ticketsData.subscribe(
      (data:any) => {
        this.tickets = data
        console.log('recived tickets', data)
      }
    )
  }

  ngOnInit(){
    this.getAllTickets()
  }


  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, ticket: object): void {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket,
    });

    this.getAllTickets()
  }

  
  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string, ticket:object): void {
    this.dialog.open(TicketComponent, {
      width: '350px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: ticket,
    });
  }

}
