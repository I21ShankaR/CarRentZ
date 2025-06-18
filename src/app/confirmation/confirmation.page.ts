import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  carName: string = '';
  carPrice: string = '';
  carDescription: string = '';
  carImage: string = '';
  pickUpDateTime: string = '';
  dropOffDateTime: string = '';
  totalDays: number = 0;
  totalPrice: string = '';
  selectedPaymentMode: string = '';
  confirmationScreenshot: File | null = null;
  walletBalance: number = 15200;
  isWalletInsufficient: boolean = false;
goToHome: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.carName = params['carName'] || '';
      this.carPrice = params['carPrice'] || '';
      this.carDescription = params['carDescription'] || '';
      this.carImage = params['carImage'] || '';
      this.pickUpDateTime = params['pickUpDateTime'] || '';
      this.dropOffDateTime = params['dropOffDateTime'] || '';

      if (this.pickUpDateTime && this.dropOffDateTime) {
        this.calculateTotalPrice();
      }
    });
  }

  calculateTotalPrice() {
    const pickUpDate = new Date(this.pickUpDateTime);
    const dropOffDate = new Date(this.dropOffDateTime);

    const timeDiff = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const pricePerDay = parseInt(this.carPrice.replace('k/day', '')) * 1000;
    const total = pricePerDay * this.totalDays;
    this.totalPrice = `${total.toLocaleString()} INR`;

    this.checkWalletBalance();
  }

  checkWalletBalance() {
    const totalAmount = parseInt(this.totalPrice.replace(' INR', '').replace(',', ''));
    this.isWalletInsufficient = this.walletBalance < totalAmount;
  }

  handleScreenshotUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.confirmationScreenshot = input.files[0];
    }
  }

  redirectToWalletPage() {
    this.router.navigate(['/wallet']);
  }

  confirmBooking() {
    if (this.selectedPaymentMode === 'Cash') {
      this.saveBooking();
    } else if (this.selectedPaymentMode === 'UPI') {
      if (this.confirmationScreenshot) {
        this.saveBooking();
      } else {
        alert('Please upload the UPI payment confirmation screenshot.');
      }
    } else if (this.selectedPaymentMode === 'Wallet') {
      if (this.walletBalance >= parseInt(this.totalPrice.replace(' INR', '').replace(',', ''))) {
        this.walletBalance -= parseInt(this.totalPrice.replace(' INR', '').replace(',', ''));
        this.saveBooking();
      } else {
        alert('Insufficient wallet balance.');
      }
    } else {
      alert('Please select a payment mode.');
    }
  }

  saveBooking() {
    const bookingDetails = {
      carName: this.carName,
      carPrice: this.carPrice,
      pickUpDateTime: this.pickUpDateTime,
      dropOffDateTime: this.dropOffDateTime,
      totalPrice: this.totalPrice,
    };

    const bookings = JSON.parse(localStorage.getItem('recentBookings') || '[]');
    bookings.push(bookingDetails);
    localStorage.setItem('recentBookings', JSON.stringify(bookings));

    alert('Booking Confirmed!');
    this.router.navigate(['/booking'], { queryParams: { recentBooking: true } });
  }
}
