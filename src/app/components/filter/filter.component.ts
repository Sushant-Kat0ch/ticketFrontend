import { Component } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TicketService } from '../../services/ticket.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  events: any;

  constructor(private ticketService : TicketService){

  }
  onvaluChange(){
    console.log('range', this.range)
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  filtereTicket(type: string, event: any) {
    console.log('event', this.range.value)
    this.ticketService.getTickets(this.range.value);
  }
  
}
