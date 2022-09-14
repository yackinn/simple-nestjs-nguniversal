import { HttpClient }           from '@angular/common/http';
import { Component }            from '@angular/core';
import { Router }               from '@angular/router';
import { TransferStateService } from '@nxarch/nguniversal';
import { take }                 from 'rxjs';
import { StateService }         from '../../data/state.service';

@Component({
  selector: 'nat-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly stateService: StateService,
    private readonly router: Router,
    private readonly transferStateService: TransferStateService
  ) {
    this.transferStateService.fetch(
      "myKey",
      () => this.httpClient.get<{product: any}>('http://localhost:4200/api/products', {})
    ).subscribe(res => {
      console.log(res?.product)
    })
  }

  onClickLogout() {
    this.httpClient.post('http://localhost:4200/api/auth/logout', {})
      .pipe(take(1))
      .subscribe(response => {
        this.stateService.nextState({ user: null });
        this.router.navigate(['/login']);
      });
  }
}
