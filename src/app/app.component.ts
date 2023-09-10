import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface ProductOffer {
  name: string;
  minAge: number;
  minIncome: number;
  forStudent: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recommend-product-app';
  selectedAge: string = '0-17';
  isChecked: boolean = false;
  selectedIncome: string = '0';
  productOffers: ProductOffer[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    const params = new HttpParams()
      .set('age', this.selectedAge)
      .set('isStudent', this.isChecked.toString())
      .set('income', this.selectedIncome);

    const headers = new HttpHeaders()
      .set('Authorization', "Basic " + btoa("valdas:abc123"));

    this.http.get<ProductOffer[]>('http://localhost:8080/api/products/recommend', { params, headers })
      .subscribe(
        (data: ProductOffer[]) => {
          console.log(data);
          this.productOffers = data;
        },
        (error: any) => {
          console.error('API Error:', error);
        }
      );
  }
}
