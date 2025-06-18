import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Car {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Booking {
  carName: string;
  carPrice: string;
  pickUpDateTime: string;
  dropOffDateTime: string;
  carImage: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  carName: string = '';
  carPrice: string = '';
  carDescription: string = '';
  carImage: string = '';

  today: string = '';
  pickUpDateTime: string = '';
  dropOffDateTime: string = '';

  showPickUpPicker: boolean = false;
  showDropOffPicker: boolean = false;

  recentBookings: Booking[] = [];

  cars: Car[] = [
    {
      id: 1,
      name: 'Thar Roxx',
      price: '8k/day',
      description: 'Manual, 4 seats, A/C',
      image: '../../assets/Thar Roxx.png',
    },
    {
      id: 2,
      name: 'Scorpio',
      price: '5k/day',
      description: 'Manual, 6 seats, A/C',
      image: '../../assets/Scorpio.png',
    },
    {
      id: 3,
      name: 'Fortuner',
      price: '7k/day',
      description: 'GearBox, 6 seats, GPS',
      image: '../../assets/Fortuner.png',
    },
    {
      id: 4,
      name: 'Range Rover Defender',
      price: '14k/day',
      description: 'Manual, 5 seats, GPS',
      image: '../../assets/Defender.png',
    },
    {
      id: 5,
      name: 'Tata Curve',
      price: '5k/day',
      description: 'Electric, 4 seats, A/C',
      image: '../../assets/Curve.png',
    },
    {
      id: 6,
      name: 'Tata Nexon',
      price: '5k/day',
      description: 'Electric, 4 seats, A/C',
      image: '../../assets/Nexon.png',
    },
    {
      id: 7,
      name: 'MG Gloister',
      price: '8k/day',
      description: 'Manual, 6 seats, A/C',
      image: '../../assets/MG Gloister.png',
    },
    {
      id: 8,
      name: 'MG Hector',
      price: '8k/day',
      description: 'GearBox, 6 seats, GPS',
      image: '../../assets/MG Hector.png',
    },
    {
      id: 9,
      name: 'Toyota Innova Crysta',
      price: '6k/day',
      description: 'Automatic, 7 seats, A/C, GPS',
      image: '../../assets/Innova.png',
    },
    {
      id: 10,
      name: 'Hyundai Creta',
      price: '4k/day',
      description: 'Manual, 5 seats, A/C',
      image: '../../assets/Creta.png',
    },
    {
      id: 11,
      name: 'Kia Seltos',
      price: '4.5k/day',
      description: 'Automatic, 5 seats, A/C, GPS',
      image: '../../assets/Seltos.png',
    },
    {
      id: 12,
      name: 'Maruti Swift',
      price: '3k/day',
      description: 'Manual, 5 seats, A/C',
      image: '../../assets/Swift.png',
    },
    {
      id: 13,
      name: 'Honda City',
      price: '4k/day',
      description: 'Automatic, 5 seats, A/C, GPS',
      image: '../../assets/City.png',
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const today = new Date();
    this.today = today.toISOString();

    this.route.queryParams.subscribe(params => {
      if (params['carId']) {
        const selectedCar = this.cars.find(car => car.id === parseInt(params['carId']));
        if (selectedCar) {
          this.setCarDetails(selectedCar.name);
        }
      }
    });

    this.loadRecentBookings();
  }

  setCarDetails(name: string) {
    const car = this.cars.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (car) {
      this.carName = car.name;
      this.carPrice = car.price;
      this.carDescription = car.description;
      this.carImage = car.image;
    } else {
      this.clearCarDetails();
    }
  }

  clearCarDetails() {
    this.carName = '';
    this.carPrice = '';
    this.carDescription = '';
    this.carImage = '';
  }

  onCarNameInput(event: any) {
    const name = event.target.value;
    this.setCarDetails(name);
  }

  togglePickUpDateTime() {
    this.showPickUpPicker = !this.showPickUpPicker;
    if (this.showPickUpPicker) {
      this.showDropOffPicker = false;
    }
  }

  toggleDropOffDateTime() {
    this.showDropOffPicker = !this.showDropOffPicker;
    if (this.showDropOffPicker) {
      this.showPickUpPicker = false;
    }
  }

  onPickUpDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      this.pickUpDateTime = '';
      alert('You cannot select a past pick-up date or time.');
    } else {
      this.pickUpDateTime = event.detail.value;
      this.showPickUpPicker = false;
    }
  }

  onDropOffDateChange(event: any) {
    const selectedDropOffDate = new Date(event.detail.value);
    const pickUpDate = new Date(this.pickUpDateTime);

    if (selectedDropOffDate <= pickUpDate) {
      this.dropOffDateTime = '';
      alert('Drop-off date and time must be after pick-up date and time.');
    } else {
      this.dropOffDateTime = event.detail.value;
      this.showDropOffPicker = false;
    }
  }

  confirmBooking() {
    if (!this.carName || !this.pickUpDateTime || !this.dropOffDateTime) {
      alert('Please fill in all required fields');
      return;
    }

    const bookingDetails: Booking = {
      carName: this.carName,
      carPrice: this.carPrice,
      pickUpDateTime: this.pickUpDateTime,
      dropOffDateTime: this.dropOffDateTime,
      carImage: this.carImage,
    };

    this.saveBooking(bookingDetails);

    this.router.navigate(['/confirmation'], {
      queryParams: bookingDetails,
    });
  }

  saveBooking(booking: Booking) {
    const storedBookings = localStorage.getItem('recentBookings');
    const bookings = storedBookings ? JSON.parse(storedBookings) : [];
    bookings.push(booking);

    if (bookings.length > 5) {
      bookings.shift();
    }

    localStorage.setItem('recentBookings', JSON.stringify(bookings));
    this.recentBookings = bookings;
  }

  loadRecentBookings() {
    const storedBookings = localStorage.getItem('recentBookings');
    this.recentBookings = storedBookings ? JSON.parse(storedBookings) : [];
  }
}
