import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Character } from './character'
import { createEndpoint } from './utils'

type CharactersResponse = {
  info: {
    count: number
    next: string
    pages: number
    prev: string
  }
  results: Character[]
}

@Injectable({
  providedIn: 'root'
})
export class RamService {
  private rickAndMortyUrl = 'https://rickandmortyapi.com/api'
  private nextUrl: string

  private createEndpoint: Function

  constructor(private http: HttpClient) {
    this.createEndpoint = createEndpoint(this.rickAndMortyUrl)
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get(this.createEndpoint('/character')).pipe(
      tap((res: CharactersResponse) => this.nextUrl = res.info.next),
      map((res: any) => res.results)
    )
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(this.createEndpoint(`/character/${id}`))
  }

  searchCharacters(term: string): Observable<Character[]> {
    return this.http.get(this.createEndpoint(`/character/?name=${term}`)).pipe(
      tap((res: CharactersResponse) => this.nextUrl = res.info.next),
      map((res: any) => res.results)
    )
  }

  loadMore(): Observable<Character[]> {
    return this.http.get(this.nextUrl).pipe(
      tap((res: CharactersResponse) => this.nextUrl = res.info.next),
      map((res: any) => res.results)
    )
  }

  get hasNext(): Boolean {
    return Boolean(this.nextUrl)
  }

  clearNext(): void {
    this.nextUrl = null
  }
}
