import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  FullHelpRequest,
  HelpStatus,
} from 'src/app/interfaces/HelpRequest.model';
import { HelpService } from 'src/app/global/services/help.service';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-detail-help',
  templateUrl: './detail-help.component.html',
  styleUrls: ['./detail-help.component.scss'],
})
export class DetailHelpComponent implements OnInit, OnDestroy {
  request: FullHelpRequest;
  status = { style: '', text: '' };
  isCanceled = false;
  sub: Subscription;

  loggedUser: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private helpService: HelpService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLocalUser().user.id;
    this.sub = this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.getHelpRequest(params.id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {}

  async getHelpRequest(id: string) {
    try {
      this.request = await this.helpService.getHelp(Number(id));
      this.updateStatusDisplay();
    } catch (error) {
      this.snackBar.open(error.message, undefined, {
        duration: 4000,
      });
      this.router.navigate(['/']);
    }
  }

  updateStatusDisplay() {
    switch (this.request.status) {
      case HelpStatus.Accepted:
        return (this.status = {
          style: 'status-accepted',
          text: 'Pedido foi Aceito',
        });
      case HelpStatus.InProgress:
        return (this.status = {
          style: 'status-inprogress',
          text: 'Pedido em Andamento',
        });
      case HelpStatus.Completed:
        return (this.status = {
          style: 'status-completed',
          text: 'Pedido Finalizado',
        });
      case HelpStatus.Canceled:
        this.isCanceled = true;
        return (this.status = {
          style: 'status-canceled',
          text: 'Pedido Cancelado',
        });
      default:
        return (this.status = {
          style: 'status-pending',
          text: 'Pedido Pendente',
        });
    }
  }

  async cancelRequest() {
    try {
      await this.helpService.updateHelpRequestStatus(this.request.id, {
        status: HelpStatus.Canceled,
      });
      this.request.status = HelpStatus.Canceled;
      this.updateStatusDisplay();
      this.snackBar.open('Seu Pedido foi Cancelado.', undefined, {
        duration: 4000,
      });
    } catch (err) {
      this.snackBar.open(err.message, undefined, {
        duration: 4000,
      });
    }
  }

  async acceptRequest() {
    try {
      await this.helpService.updateHelpRequestStatus(this.request.id, {
        status: HelpStatus.Accepted,
      });
      this.request.helper_id = this.loggedUser;
      this.request.status = HelpStatus.Accepted;
      this.updateStatusDisplay();
      this.snackBar.open('Pedido Aceito com Sucesso.', undefined, {
        duration: 4000,
      });
    } catch (err) {
      this.snackBar.open(err.message, undefined, {
        duration: 4000,
      });
    }
  }

  async progressRequest() {
    try {
      await this.helpService.updateHelpRequestStatus(this.request.id, {
        status: HelpStatus.InProgress,
      });
      this.request.status = HelpStatus.InProgress;
      this.updateStatusDisplay();
      this.snackBar.open(
        'Pedido foi marcado como Em Andamento com Sucesso.',
        undefined,
        {
          duration: 4000,
        }
      );
    } catch (err) {
      this.snackBar.open(err.message, undefined, {
        duration: 4000,
      });
    }
  }

  async completeRequest() {
    try {
      await this.helpService.updateHelpRequestStatus(this.request.id, {
        status: HelpStatus.Completed,
      });
      this.request.status = HelpStatus.Completed;
      this.updateStatusDisplay();
      this.snackBar.open(
        'Sensacional! Parabéns por ter ajudado alguem com necessidade! O pedido está marcado como completado com sucesso!',
        undefined,
        {
          duration: 4000,
        }
      );
    } catch (err) {
      this.snackBar.open(err.message, undefined, {
        duration: 4000,
      });
    }
  }

  async undoHelpRequest() {
    try {
      await this.helpService.updateHelpRequestStatus(this.request.id, {
        status: HelpStatus.Pending,
      });
      this.request.helper_id = 0;
      this.request.status = HelpStatus.Pending;
      this.updateStatusDisplay();
      this.snackBar.open(
        'A ajuda foi cancelada, pedido está pendente novamente.',
        undefined,
        {
          duration: 4000,
        }
      );
    } catch (err) {
      this.snackBar.open(err.message, undefined, {
        duration: 4000,
      });
    }
  }

  toCurrency(num: any) {
    return parseFloat(num).toFixed(2);
  }
}
