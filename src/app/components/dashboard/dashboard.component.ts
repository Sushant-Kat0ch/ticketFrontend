import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from '../../services/ticket.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { FilterComponent } from '../filter/filter.component';
import { ListingComponent } from '../listing/listing.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterComponent, ListingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    public dialog: MatDialog,
    private ticketService: TicketService,
  ) {}
  
  tickets : any

  

  ngOnInit(){
  }

  // onClickDelete(ticket:any){
  //   console.log(ticket);
  //   this.ticketService.deleteTicket(ticket.id).subscribe(
  //     (res) => {
  //       console.log('response')
  //       this.getAllTickets()
  //     }
  //   )

  // }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TicketComponent, {
      width: '350px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
}
