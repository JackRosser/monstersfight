import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { MonsterselectComponent } from './pages/monsterselect/monsterselect.component';

const routes: Route[] = [
  {
    path: "",
    component: MonsterselectComponent

  }
]

@NgModule({
  declarations: [
    AppComponent,
    MonsterselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
