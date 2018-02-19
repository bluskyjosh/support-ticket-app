import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {StatusService} from '../../services/status.service';
import {CategoryService} from '../../services/category.service';
import {PriorityService} from '../../services/priority.service';
import {TicketService} from '../../services/ticket.service';
import {Category} from '../../models/category.model';
import {Priority} from '../../models/priority.model';
import {Status} from '../../models/status.model';
import {Ticket} from '../../models/ticket.model';
import {User} from '../../models/user.model';
import {Comment} from '../../models/comment.model';
import {CommentService} from '../../services/comment.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  categories: Category[];
  priorities: Priority[];
  statuses: Status[];
  users: User[];

  type: string;
  currentUser: User;

  ticket: Ticket;
  newComment: Comment;
  constructor(private alertMessageService: AlertMessageService,
              private statusService: StatusService,
              private categoryService: CategoryService,
              private priorityService: PriorityService,
              private ticketService: TicketService,
              private commentService: CommentService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = new User().from(JSON.parse(sessionStorage.getItem('currentUser')));
    this.getStatuses();
    this.getCategories();
    this.getPriorities();
    this.getUsers();
    this.getTicket();

    this.newComment = new Comment();
  }

  getStatuses(): void {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getPriorities(): void {
    this.priorityService.getPriorities().subscribe( data => {
      this.priorities = data;
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getTicket(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.ticket = new Ticket();
      this.ticket.id = 0;
      this.type = '(New)';
    } else if (this.currentUser.is_admin) {
      this.ticketService.getTicket(id).subscribe(data => {
        this.ticket = data;
        this.type = '#' + this.ticket.ticket_id;
      });

    } else {
      this.ticketService.getMyTicket(id).subscribe(data => {
        this.ticket = data;
        this.type = '#' + this.ticket.ticket_id;
      });
    }
  }

  save(): void {
    if (this.ticket.id === 0) {
      this.ticket.status_id = this.statuses[0].id;
    }
    if (this.currentUser.is_admin) {
      if (this.ticket.id === 0) {
        this.ticketService.createTicket(this.ticket).subscribe(data => {
          this.ticket = data;
        });
      } else {
        this.ticketService.updateTicket(this.ticket).subscribe(data => {
          this.ticket = data;
        });
      }
    } else {
      if (this.ticket.id === 0) {
        this.ticketService.createMyTicket(this.ticket).subscribe( data => {
          this.ticket = data;
        });
      } else {
        this.ticketService.updateMyTicket(this.ticket).subscribe( data => {
          this.ticket = data;
        });
      }
    }

  }

  cancel(): void {
    this.router.navigateByUrl('/home/tickets');
  }

  isDisabled(): boolean {
    return this.ticket.id !== 0 && !this.currentUser.is_admin;
  }

  notNewTicket(): boolean {
    return typeof this.ticket.id !== 'undefined' && this.ticket.id !== 0;
  }

  addComment(): void {
    this.newComment.created_by_id = this.currentUser.id;
    this.commentService.createComment(this.ticket.id, this.newComment).subscribe(data => {
      this.ticket.comments.push(data);
    });
  }

}
