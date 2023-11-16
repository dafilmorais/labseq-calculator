import { Component } from '@angular/core';
import { LabSeqService } from '../services/LabSeqService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-labseq',
  templateUrl: './LabSeqComponent.html',
  styleUrls: ['LabSeqComponent.css'],
})
export class LabSeqComponent {
  sequenceNumber: string = '';
  labSeqValue: string = '-';
  loading: boolean = false;
  error: string | null = null;
  fetchCounter: number = 0;
  private counterInterval: any;
  historyResults: { input: string; output: string; elapsedTime: string }[] = [];
  
  private labSeqSubscription: Subscription | null = null;

  constructor(private labSeqService: LabSeqService) {}

  isValidInput(): boolean {
    const positiveIntegerRegex = /^[0-9]\d*$/;
    const isValid = positiveIntegerRegex.test(this.sequenceNumber);
    return isValid;
  }

  getLabSeqValue(): void {
    this.loading = true;
    this.error = null;
    this.fetchCounter = 0;

    if (!this.isValidInput()) {
      return;
    }

    if (this.labSeqSubscription) {
      this.labSeqSubscription.unsubscribe();
    }

    this.counterInterval = setInterval(() => {
      this.fetchCounter++;
    }, 1000);

    const inputNumber = this.sequenceNumber !== '' ? +this.sequenceNumber : 0;

    this.labSeqSubscription = this.labSeqService
    .getLabSeqValue(inputNumber.toString())
    .subscribe({
      next: (value) => {
        clearInterval(this.counterInterval);
        this.labSeqValue = value.toString();

        this.historyResults.push({
          input: this.sequenceNumber?.toString() ?? 'N/A',
          output: this.labSeqValue.toString(),
          elapsedTime: this.formatTime(this.fetchCounter),
        });
        this.sequenceNumber = '';
        this.loading = false;
      },
      error: (error) => {
        clearInterval(this.counterInterval);
        console.error('Error fetching LabSeq value:', error);
        this.error = 'Error fetching LabSeq value. <br>Please try again.';
        this.loading = false;
      },
    });
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${remainingSeconds}s`;
  }

  ngOnDestroy(): void {
    clearInterval(this.counterInterval);
  }
  
  openSwaggerUI(): void {
    const swaggerUrl = 'http://localhost/q/swagger-ui';
    window.open(swaggerUrl, '_blank');
  }
}