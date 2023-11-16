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
  historyResults: { input: string; output: string }[] = [];
  
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
  
    if (!this.isValidInput()) {
      return;
    }
  
    if (this.labSeqSubscription) {
      this.labSeqSubscription.unsubscribe();
    }
  
    const inputNumber = this.sequenceNumber !== '' ? +this.sequenceNumber : 0;
  
    this.labSeqSubscription = this.labSeqService
      .getLabSeqValue(inputNumber)
      .subscribe({
        next: (value) => {
          this.labSeqValue = value.toString();
  
          this.historyResults.push({
            input: this.sequenceNumber?.toString() ?? 'N/A',
            output: this.labSeqValue.toString(),
          });
          this.sequenceNumber = '';
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching LabSeq value:', error);
          this.error = 'Error fetching LabSeq value. <br>Please try again.';
          this.loading = false;
        },
      });
  }
  
  openSwaggerUI(): void {
    const swaggerUrl = 'http://localhost:8080/q/swagger-ui';
    window.open(swaggerUrl, '_blank');
  }
}
