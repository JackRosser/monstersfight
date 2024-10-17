import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { MonsterselectComponent } from './pages/monsterselect/monsterselect.component';
import { PreviewsComponent } from './pages/previews/previews.component';
import { MainmonsterComponent } from './pages/previews/mainmonster/mainmonster.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DeckComponent } from './navbar/deck/deck.component';
import { DeckmodalComponent } from './modals/deckmodal/deckmodal.component';
import { FormsModule } from '@angular/forms';
import { YellowboxDirective } from './directives/yellowbox.directive';
import { SelectattributeComponent } from './pages/selectattribute/selectattribute.component';
import { MenuinizialeComponent } from './pages/menuiniziale/menuiniziale.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ArenaComponent } from './combat/arena/arena.component';
import { PlayerComponent } from './combat/player/player.component';
import { OpponentComponent } from './combat/opponent/opponent.component';

const routes: Route[] = [
  {
    path: "",
    // component: MenuinizialeComponent
    component: ArenaComponent

  },
  {
    path: "card-selector",
    component: MonsterselectComponent
  },
  {
    path: "arena",
    component: ArenaComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MonsterselectComponent,
    PreviewsComponent,
    MainmonsterComponent,
    NavbarComponent,
    DeckComponent,
    DeckmodalComponent,
    YellowboxDirective,
    SelectattributeComponent,
    MenuinizialeComponent,
    ArenaComponent,
    PlayerComponent,
    OpponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
