import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HiveSection} from '../models/hive-section'
import {HiveSectionService} from '../services/hive-section.service'
import { HiveService } from '../services/hive.service';
import { HiveListItem } from '../models/hive-list-item';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveId: number;
  hiveSection = new HiveSection(0, "", "", false, "");
  existed = false;
  hives: HiveListItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.hiveService.getHives().subscribe(c => this.hives = c);
    this.route.params.subscribe(p => {
      this.hiveId = p['hiveId'];
      if (p['sectionId'] === undefined) return;
      this.hiveSectionService.getHiveSection(p['sectionId']).subscribe(h => this.hiveSection = h);
      this.existed = true;
    });
  }

    navigateToHiveSections() 
    {
      this.router.navigate([`hive/${this.hiveId}/sections`]);
    }

    onCancel() {
      this.navigateToHiveSections();
    }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(p => this.navigateToHiveSections());
    } else {
      this.hiveSectionService.addHiveSection(this.hiveId, this.hiveSection).subscribe(p => this.navigateToHiveSections());
    }
  }

  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id,true).subscribe(p => this.hiveSection.isDeleted = true )
    }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id,false).subscribe(p => this.hiveSection.isDeleted = false )
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(p=> this.navigateToHiveSections());
  }
}
