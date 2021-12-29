import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-carousel',
  templateUrl: './home-page-carousel.component.html',
  styleUrls: ['./home-page-carousel.component.less'],
})
export class HomePageCarouselComponent implements OnInit {
  @Input() data: any;
  activeSlideItems = [];
  restSlideItems = [];

  constructor() {}

  ngOnInit(): void {
    console.log('books', this.data);
    this.setSliderData(this.data);
  }

  setSliderData(data: any) {
    if (data.length <= 4) {
      this.activeSlideItems = data.slice(0, data.length);
    } else {
      this.activeSlideItems = data.slice(0, 4);
      this.restSlideItems = data.slice(4, data.length);
    }

    console.log(this.activeSlideItems);
    console.log(this.restSlideItems);
  }
}
