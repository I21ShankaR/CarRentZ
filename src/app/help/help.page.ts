import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {
  isChatbotOpen = false;
  isFAQsOpen = false;
  selectedCategory: 'Car Details' | 'Booking Issues' | 'Payment Queries' = 'Car Details'; 
  faqs: {
    'Car Details': { question: string; answer: string }[];
    'Booking Issues': { question: string; answer: string }[];
    'Payment Queries': { question: string; answer: string }[];
  } = {
    'Car Details': [
      { question: 'What types of cars are available with CarRentZ?', answer: 'We offer sedans, SUVs, hatchbacks, and luxury cars.' },
      { question: 'Are the cars insured?', answer: 'Yes, all our cars are insured for your safety.' },
      { question: 'Can I see the car before booking?', answer: 'Yes, you can view the car details and images on our app before booking.' },
    ],
    'Booking Issues': [
      { question: 'How can I add money into my Wallet on CarRentZ?', answer: 'You can add money into your wallet by clicking on "Add Funds" section on the wallet page. Then you can scan the QR code and pay the money and upload the confirmation screenshot. VOILA!! Money added. ' },
      { question: 'Can I modify my booking?', answer: 'No,Currently modifications cannot be made as we are just a small company.' },
      { question: 'What should I do if my booking is not confirmed?', answer: 'Please check your payment status and contact our customer support if needed.' },
    ],
    'Payment Queries': [
      { question: 'What payment methods are accepted by CarRentZ?', answer: 'We accept credit/debit cards, UPI, and digital wallets.' },
      { question: 'Can I pay in cash?', answer: 'Yes,Unlike others we do not accept cash payments for bookings.' },
      { question: 'Is my payment secure on CarRentZ?', answer: 'Yes, we use SSL encryption for all transactions to ensure your payment information is secure.' },
    ],
  };

  constructor() {}

  openChatbot() {
    this.isChatbotOpen = true;
    setTimeout(() => {
      window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=24.7.CarRentZ@gmail.com',
        '_blank'
      );
      this.isChatbotOpen = false;
    }, 1000);
  }

  openFAQs() {
    this.isFAQsOpen = true;
  }

  closeFAQs() {
    this.isFAQsOpen = false;
    this.selectedCategory = 'Car Details'; 
  }

  selectCategory(category: 'Car Details' | 'Booking Issues' | 'Payment Queries') {
    this.selectedCategory = category;
  }
}
