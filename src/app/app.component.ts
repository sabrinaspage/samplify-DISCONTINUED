import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZenObservable } from 'zen-observable-ts';
import { APIService, Restaurant } from './API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sabs-portfolio';
  public restaurants: Array<Restaurant> = [];
  private subscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  /* subscribe to new restaurants being created */
  async ngOnInit() {
    this.api.ListRestaurants().then((event) => {
      this.restaurants = event.items as Restaurant[];
    });

    this.subscription = this.api
      .OnCreateRestaurantListener()
      .subscribe((event) => {
        const newRestaurant = event.value.data?.onCreateRestaurant;
        if (newRestaurant) {
          this.restaurants = [newRestaurant, ...this.restaurants];
        }
      });
  }
}
