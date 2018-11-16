import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component'
import { CharacterSearchComponent } from './character-search/character-search.component'

const routes: Routes = [
  { path: '', component: CharactersComponent, pathMatch: 'full' },
  { path: 'search', component: CharacterSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
