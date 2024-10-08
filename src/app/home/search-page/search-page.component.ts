import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;

  searchQuery: string = '';
  recentSearches: string[] = [];

  constructor(
    private _router: Router,
    private _crud: CrudService
  ) {}

  ionViewDidEnter() {
    this.searchbar.setFocus();
    this.loadRecentSearches(); 
  }

  ngOnInit() {}

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    console.log(this.searchQuery);
    if (this.searchQuery.trim().length > 0) {
      this._crud.get_search_advocate(this.searchQuery).subscribe(
        (res: any) => {
          console.log(res.data);
          this.saveRecentSearch(this.searchQuery);
        },
        (error) => {
          console.error('Error fetching search results', error);
        }
      );
    }
  }

  onCancel() {
    this.searchQuery = '';
    this._router.navigate(['/user/home/dashboard']);
  }

  // Load recent searches from localStorage
  loadRecentSearches() {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      this.recentSearches = JSON.parse(searches);
    }
  }

  // Save the current search query to recent searches
  saveRecentSearch(search: string) {
    if (!this.recentSearches.includes(search)) {
      if (this.recentSearches.length >= 5) {
        this.recentSearches.pop(); // Remove the oldest search
      }
      this.recentSearches.unshift(search); // Add the new search to the top
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }
  }

  // Handle click on recent search
  onRecentSearch(search: string) {
    this.searchQuery = search;
    this.onSearch({ target: { value: search } }); // Trigger search with the selected recent search
  }
}
