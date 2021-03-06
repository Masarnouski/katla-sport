import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service'
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.css']
})
export class HiveSectionListComponent implements OnInit {

  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private hiveService: HiveService,
    private hiveSectionService:HiveSectionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveId = p['id'];
      this.hiveService.getHiveSections(this.hiveId).subscribe(s => this.hiveSections = s);
    })
  }

  onDelete(sectionId:number)
  {
      var section = this.hiveSections.find(h => h.id == sectionId);
      this.hiveSectionService.setHiveSectionStatus(sectionId, true).subscribe(c => section.isDeleted = true);
  }

  onUndelete(sectionId:number)
  {
    var section = this.hiveSections.find(h => h.id == sectionId);
    this.hiveSectionService.setHiveSectionStatus(sectionId, false).subscribe(c => section.isDeleted = false);
  }
  
}
