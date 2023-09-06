import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recommend-product-app';
  selectedValue: string = '0-17';
  isChecked: boolean = false;
  secondSelectedValue: string = '0';
  productOffers: string[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Form submitted');
    console.log('Select Field:', this.selectedValue);
    console.log('Checkbox:', this.isChecked);
    console.log('Second Select Field:', this.secondSelectedValue);

    const params = new HttpParams()
      .set('age', this.selectedValue)
      .set('isStudent', this.isChecked.toString())
      .set('income', this.secondSelectedValue);

    // Make the API GET request
    this.http.get<string[]>('http://localhost:8080/api/products/recommend', { params })
      .subscribe(
        (data: string[]) => {
          console.log(data);
          this.productOffers = data;
          console.log('API Response:', this.productOffers);
        },
        (error: any) => {
          console.error('API Error:', error);
        }
      );
  }
}
