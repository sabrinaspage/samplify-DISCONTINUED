import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Restaurant } from '../API.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent {
  public createForm: FormGroup;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then(() => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...');
      });
  }
}
