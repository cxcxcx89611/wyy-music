import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject} from '@angular/core';
import {HomeService} from '../../service/home.service';
import {Banner, HotTag, Singer, SongSheet} from '../../service/data-types/common-types';
import {NzCarouselComponent} from 'ng-zorro-antd';
import {SingerService} from '../../service/singer.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {SheetService} from '../../service/sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  arr = Array(8).fill(4);
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];

  // 轮播当前索引
  carouselActiveIndex = 0;

  // get bannerBg(): string {
  //   return this.banners && this.banners[this.carouselActiveIndex].bgColor;
  // }

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;
  constructor(private route: ActivatedRoute, private sheetServe: SheetService) {

    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
    });
  }

  ngOnInit() {
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {
      console.log(list);
    });
  }

  // trackByBanners(index: number, banner: Banner): number { return banner.targetId; }
}
