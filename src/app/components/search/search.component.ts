import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() options: any[] = [];
  @Input() displayKeys: string[] = [];
  @Input() queryKeys: string[] = [];
  @Output() selection: EventEmitter<any> = new EventEmitter();

  myControl = new FormControl('');
  filteredOptions: Observable<any[]> | null = null;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  onSelection(option: any) {
    this.selection.emit(option);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return filterValue ?
      this.options.filter((option) => {
        return this.queryKeys.some((key) => {
          return option[key].toLowerCase().includes(filterValue);
        });
      }) :
      [];
  }
}
