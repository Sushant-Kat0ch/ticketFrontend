import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Ticket {
  id: number; // Assuming an ID for each ticket
  ticketName: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})


export class TicketService {

  constructor(private http : HttpClient) {

  }

  public ticketsData : BehaviorSubject<any> = new BehaviorSubject('')

 private apiurl = 'http://localhost:3000'

  createTicket( userData  : any){
  const httpOptions = new HttpHeaders({'Content-Type': 'application/json'})
  return this.http.post(`${this.apiurl}/api/tickets/create-ticket`, userData, { headers: httpOptions})
 }
 


  getAllTicket(){
  const httpOptions = new HttpHeaders({'Content-Type': 'application/json'})
  return this.http.get(`${this.apiurl}/api/tickets/get-all-tickets`).subscribe( (data:any) => {
    this.ticketsData.next(data?.ticket)
  })
  }
  getTickets(range:any){
  const httpOptions = new HttpHeaders({'Content-Type': 'application/json'})
  let params = new HttpParams().set('startDate', range.start).set('endDate', range.end);
  this.http.get(`${this.apiurl}/api/tickets/get-all-tickets?`, {params}).subscribe( (res:any) => {
    console.log('tiketdata', res)
    this.ticketsData.next(res.ticket)
  })
  }
  
  deleteTicket(id:number){
  const httpOptions = new HttpHeaders({'Content-Type': 'application/json'})
  return this.http.delete(`${this.apiurl}/api/tickets/delete-ticket?id=${id}`)

}

updateTicket( ticketData  : any){
  const httpOptions = new HttpHeaders({'Content-Type': 'application/json'})
  return this.http.put(`${this.apiurl}/api/tickets/update-ticket`, ticketData, { headers: httpOptions})
 }


}
