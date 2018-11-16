import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap, map
 } from 'rxjs/operators';

import { Character } from '../character';
import { RamService } from '../ram.service';

type CharactersResponse = {
  info: {}
  results: Character[]
}


@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss', '../shared.styles.scss']
})
export class CharacterSearchComponent implements OnInit {
  characters$: Observable<Character[]>
  private searchQuery = new Subject<string>()
  characters: Character[] = []

  constructor(private ramService: RamService) { }

  ngOnInit() {
    this.ramService.clearNext()
    this.characters$ = this.searchQuery.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((query: string) => this.ramService.searchCharacters(query)))
  }

  search(query: string): void {
    this.searchQuery.next(query)
  }

  loadMore(): void {
    this.ramService.loadMore().subscribe(data => {
      this.characters.push(...data)
    })
  }

  get hasNext(): Boolean {
    return this.ramService.hasNext
  }
}
