import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home.component';

const nzModule = [NzLayoutModule, NzGridModule, NzCardModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FeaturesRoutingModule, ...nzModule]
})
export class FeaturesModule {}
