import { Component, OnDestroy } from '@angular/core';
import { Video } from './interfaces/youtube.models';
import { YoutubeService } from 'src/app/shared/services/youtube.service';
import Swal from 'sweetalert2';
import { sortBy } from 'sort-by-typescript';
// ... Prime NG cardData

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
})
export class TutorialComponent implements OnDestroy {
  videos: Video[] = [];
  validarVideos = true;

  constructor(private youtubeService: YoutubeService) {}
  ngOnDestroy(): void {
    this.videos = [];
  }

  ngOnInit() {
    this.youtubeService.nextPageToken = '';
    this.youtubeService.valideVideos = true;
    this.cargarVideos();
  }

  onFilter(value: string) {
    if (value.length > 0) {
      let videoArr: Video[] = [];
      value = value.toLocaleLowerCase();
      for (let letvideo of this.videos) {
        let title = letvideo.title.toLocaleLowerCase();
        if (title.indexOf(value) >= 0) {
          videoArr.push(letvideo);
        }
      }
      this.videos = videoArr;
      return this.videos;
    } else {
      this.youtubeService.nextPageToken = '';
      this.youtubeService.valideVideos = true;
      this.cargarVideos();
    }
  }
  cargarVideos() {
    this.youtubeService.getVideos().subscribe((resp) => {
      // this.videos.push(...resp);
      let temp: any[] = resp;
      this.videos = temp.sort(sortBy('-publishedAt'));
      this.validarVideos = this.youtubeService.valideVideos;
    });
  }

  mostrarVideo(video: Video) {
    Swal.fire({
      html: `
        <h4> ${video.title} </h4>
        <hr>
        <iframe width="100%"
                height="315"
                src="https://www.youtube.com/embed/${video.resourceId.videoId}"
                frameborder="0"
                allow="accelerometer;
                autoplay;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowfullscreen>
        </iframe>
      `,
    });
  }
}
