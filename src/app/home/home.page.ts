import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchQuery: string = '';
  cars: any[] = [];
  filteredCars: any[] = [];

  constructor(private router: Router) {
    this.cars = [
      {
        name: 'Thar Roxx',
        price: '8k/day',
        description: 'Manual, 4 seats, A/C',
        image: '../../assets/Thar Roxx.png',
      },
      {
        name: 'Scorpio',
        price: '5k/day',
        description: 'Manual, 6 seats, A/C',
        image: '../../assets/Scorpio.png',
      },
      {
        name: 'Fortuner',
        price: '7k/day',
        description: 'GearBox, 6 seats, GPS',
        image: '../../assets/Fortuner.png',
      },
      {
        name: 'Range Rover Defender',
        price: '14k/day',
        description: 'Manual, 5 seats, GPS',
        image: '../../assets/Defender.png',
      },
      {
        name: 'Tata Nexon',
        price: '5k/day',
        description: 'Electric, 4 seats, A/C',
        image: '../../assets/Nexon.png',
      },
      {
        name: 'MG Gloister',
        price: '8k/day',
        description: 'Manual, 6 seats, A/C',
        image: '../../assets/MG Gloister.png',
      },
      {
        name: 'MG Hector',
        price: '8k/day',
        description: 'GearBox, 6 seats, GPS',
        image: '../../assets/MG Hector.png',
      },
      {
        name: 'Toyota Innova Crysta',
        price: '6k/day',
        description: 'Automatic, 7 seats, A/C, GPS',
        image: '../../assets/Innova.png',
      },
      {
        name: 'Hyundai Creta',
        price: '4k/day',
        description: 'Manual, 5 seats, A/C',
        image: '../../assets/Creta.png',
      },
      {
        name: 'Kia Seltos',
        price: '4.5k/day',
        description: 'Automatic, 5 seats, A/C, GPS',
        image: '../../assets/Seltos.png',
      },
      {
        name: 'Maruti Swift',
        price: '3k/day',
        description: 'Manual, 5 seats, A/C',
        image: '../../assets/Swift.png',
      },
      {
        name: 'Honda City',
        price: '4k/day',
        description: 'Automatic, 5 seats, A/C, GPS',
        image: '../../assets/City.png',
      }
    ];

    this.filteredCars = this.cars;
  }

  ngOnInit() {}

  filterCars() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.name.toLowerCase().includes(query) ||
      car.description.toLowerCase().includes(query)
    );
  }

  goToBooking(car: any) {
    this.router.navigate(['/booking'], {
      queryParams: {
        name: car.name,
        price: car.price,
        description: car.description,
        image: car.image
      }
    });
  }
}