import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"personal-game-library-app","appId":"1:197171953962:web:82ce38c81b8087bc139e53","databaseURL":"https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"personal-game-library-app.appspot.com","apiKey":"AIzaSyDqgOYCaDaI1341FM4EHJ1fRtrzv5rL8dA","authDomain":"personal-game-library-app.firebaseapp.com","messagingSenderId":"197171953962"})), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"personal-game-library-app","appId":"1:197171953962:web:82ce38c81b8087bc139e53","databaseURL":"https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"personal-game-library-app.appspot.com","apiKey":"AIzaSyDqgOYCaDaI1341FM4EHJ1fRtrzv5rL8dA","authDomain":"personal-game-library-app.firebaseapp.com","messagingSenderId":"197171953962"})), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
