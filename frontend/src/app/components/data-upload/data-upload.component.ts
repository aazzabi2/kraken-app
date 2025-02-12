import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Kraken } from '../../models/kraken.model';
import { KrakenService } from '../../services/kraken.service';
import { CommonModule } from '@angular/common';
import { KrakenHelper } from '../../helpers/kraken.helper';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [KrakenService],
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css'],
})
export class DataUploadComponent {
  data: Kraken[] = [];

  constructor(private KrakenService: KrakenService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      this.processData(excelData);
    };

    reader.readAsArrayBuffer(file);
  }

  processData(excelData: any[]) {
    const uniqueNames = new Set<string>();

    this.data = excelData
      .filter(
        (item) => KrakenHelper.findProperty(item, ['name', 'Name']) !== 'name'
      )
      .map((item: any) => {
        const name = KrakenHelper.findProperty(item, ['name', 'Name']);

        if (!name || uniqueNames.has(name)) {
          return null;
        }
        uniqueNames.add(name);

        return {
          name,
          updated_at: KrakenHelper.getDateFromData(item),
          prices: KrakenHelper.getPricesFromData(item),
          rate: KrakenHelper.getRateFromData(item),
          category: KrakenHelper.getCategoryFromData(item),
        };
      })
      .filter((item) => item !== null) as Kraken[];
  }

  upload() {
    this.KrakenService.uploadData(this.data).subscribe(
      (response) => {
        console.log('Données envoyées avec succès:', response);
      },
      (error) => {
        console.error("Erreur lors de l'envoi des données:", error);
      }
    );
  }
}
