import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/services/carousel.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
 
  carousel: any;
  slide: number = 0;
  slides: number = 0;

  constructor(private carouselService: CarouselService) {
    setInterval(() => {
      this.autoSlide();
    }, 5000);
  }

  async ngOnInit() {
    this.carousel = null;
    const carousel$ = await this.carouselService.getCarousel("home")
    carousel$.subscribe((carousel) => {
        this.carousel = carousel;
        this.slides = (this.carousel.items.length > 0) ? this.carousel.items.length -1  : 0
    })
  }

  prev() {
    this.slide= this.slide > 0 ?  this.slide -1 : this.slides;
  }
  next() {
    this.slide= this.slide + 1 <= this.slides ? this.slide+1 : 0;
  }
  autoSlide() {
    this.slide= this.slide + 1 <= this.slides ? this.slide + 1 : 0;
  }
  selectSlide(event: any) {
    const target = event.target as HTMLImageElement;
    this.slide = +target.id;
  }
  slideSelected(idx: number) {
    return (idx === this.slide) ? true : false;
  }
}
