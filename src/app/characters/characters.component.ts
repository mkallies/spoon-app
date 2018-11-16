import { Component, OnInit } from '@angular/core';
import { RamService } from '../ram.service'
import { Character } from '../character'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss', '../shared.styles.scss']
})
export class CharactersComponent implements OnInit {
  characters: Character[]

  constructor(private ramService: RamService) { }

  ngOnInit() {
    this.ramService.clearNext()
    this.getCharacters()
  }

  getCharacters(): void {
    this.ramService.getCharacters().subscribe(data => this.characters = data)
  }

  loadMore(): void {
    this.ramService.loadMore().subscribe(data => this.characters.push(...data))
  }

  get hasNext(): Boolean {
    return this.ramService.hasNext
  }
}
