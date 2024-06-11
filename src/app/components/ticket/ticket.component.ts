import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface Ticket {
  id: number; // Assuming an ID for each ticket
  ticketName: string;
  date: Date;
}

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [MatButtonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule,MatDialogClose],
  templateUrl: './ticket.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  constructor(
    private fb : FormBuilder,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketData = data;
  }

  ngOnInit(){
    console.log('ticket data', this.ticketData)
    this.ticketForm.patchValue({
      ticketName: this.ticketData.ticketName,
      date: new Date(Date.parse(this.ticketData.date))
      
    })
  }
  
  
  ticketForm = this.fb.group({
    ticketName : ['', Validators.required],
    date: [new Date(), Validators.required]
    })

  ticketData: any;
    
  onSubmit(ticketForm : FormGroup){
    if(!ticketForm.valid){
      return
    }
    if(this.ticketData){
      ticketForm.value.id = this.ticketData.id
      this.ticketService.updateTicket(ticketForm.value).subscribe(
        (value) => {
          console.log(value)
          this.ticketService.getAllTicket()
          ticketForm.reset()
        }
      )
    } else {
      this.ticketService.createTicket(ticketForm.value).subscribe(
        (value) => {
          this.ticketService.getAllTicket()
          console.log(value)
        }
      )
    }
    console.log('create tickets', ticketForm)

    


  }



}

