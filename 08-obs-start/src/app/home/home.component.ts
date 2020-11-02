import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    // Нужно отписываться от созданного observable, иначе он продолжит работать
    this.firstObsSubscription.unsubscribe();
  }

  ngOnInit() {
    // this.firstObsSubscription =  interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Count is greater 3!"));
        }
        count++;
      }, 1000);
    });

    // this.firstObsSubscription =  customIntervalObservable.subscribe(data => {
    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter(data => { // filter, map - операторы, с помощью которых можно изменять данные
          return data > 0; // после получения, но до отображения
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          // В случае complete, аргументы не нужны
          console.log("completed");
        }
      );
  }
}
