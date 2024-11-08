import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommendations-routing.module';

import { RecommendationsPage } from './recommendations.page';
import { RecommendationsElementComponent } from './recommendations-element/recommendations-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsPageRoutingModule
  ],
  declarations: [RecommendationsPage, RecommendationsElementComponent]
})
export class RecommendationsPageModule {}
