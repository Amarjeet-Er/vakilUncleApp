import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;
  userRating=4
  searchQuery: string = '';
  recentSearches: string[] = [];
  validSearch: boolean = false; 
  searchLawyers: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared:SharedService
  ) {
    this._shared.img_url.subscribe(
      (res:any)=>{
        this.img_url=res
      }
    )
  }

  ionViewDidEnter() {
    this.searchbar.setFocus();
    this.loadRecentSearches(); 
  }

  ngOnInit() {}
  onSearch(event: any) {
    this.searchQuery = event.target.value.trim();
    
    if (this.searchQuery.length === 0) {
      this.loadRecentSearches();
    } else {
      this.recentSearches = [];
    }

    if (this.searchQuery.length > 0) {
      this._crud.get_search_advocate(this.searchQuery).subscribe(
        (res: any) => {
          if (res.data && res.data.length > 0) {
            this.validSearch = true;
            this.searchLawyers=res.data
            this.saveRecentSearch(this.searchQuery); 
            console.log(res.data);
          } else {
            this.validSearch = false;
            console.log('No results found');
          }
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

  loadRecentSearches() {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      this.recentSearches = JSON.parse(searches);
    }
  }
  advocateProfile(){}
  saveRecentSearch(search: string) {
    if (!this.recentSearches.includes(search)) {
      if (this.recentSearches.length >= 5) {
        this.recentSearches.pop(); 
      }
      this.recentSearches.unshift(search);
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }
  }

  onRecentSearch(search: string) {
    this.searchQuery = search;
    this.onSearch({ target: { value: search } }); 
  }
}
