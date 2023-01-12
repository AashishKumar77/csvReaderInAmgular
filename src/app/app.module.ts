import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
// import {MatIconModule} from '@angular/material/icon';


@NgModule({ 
  imports:      [ BrowserModule, FormsModule ,HttpClientModule],
  declarations: [AppComponent, HelloComponent],
 
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
