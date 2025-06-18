import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  balance: number = 28640.80; 
  showAddFundsForm: boolean = false;
  fundsAmount: number = 0;
  selectedFile: File | null = null;
  transactions = [
    { title: 'Added Funds', amount: 150.00, date: 'Oct 15, 2024' },
    { title: 'Withdrawal', amount: -80.00, date: 'Oct 01, 2024' },
    { title: 'Referral Fees', amount: -50.00, date: 'Oct 24, 2024' },
    { title: 'Added Funds', amount: 150.00, date: 'Oct 11, 2024' },
  ];

  constructor() {}

  ngOnInit() {}

  openAddFundsForm() {
    this.showAddFundsForm = true;
  }

  closeAddFundsForm() {
    this.showAddFundsForm = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addFunds() {
    if (this.fundsAmount > 0 && this.selectedFile) {
      this.balance += this.fundsAmount;
      this.transactions.unshift({
        title: 'Added Funds',
        amount: this.fundsAmount,
        date: new Date().toLocaleDateString(),
      });
      this.fundsAmount = 0;
      this.selectedFile = null;
      this.closeAddFundsForm();
    } else {
      alert('Please enter a valid amount and upload a screenshot.');
    }
  }
}