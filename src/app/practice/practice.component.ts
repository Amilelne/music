import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  courses = [
    {
      title: '乐谱一',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '乐谱二',
      desc: '乐理部分',
      img: 'assets/images/composer.jpg'
    },
    {
      title: '乐谱一',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '乐谱二',
      desc: '乐理部分',
      img: 'assets/images/composer.jpg'
    },
    {
      title: '乐谱一',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '乐谱二',
      desc: '乐理部分',
      img: 'assets/images/composer.jpg'
    }
  ];
  ngOnInit() {}
}
