import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  imgUrls = [
    'http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner1-nv7w1t9nncjfdquxgyjpbp7qibvjzqxzktynnwh35w.png',
    'http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner2-nv7w1u7hu6kppctkbgybw6z73pqx7g1pwym556fozo.png',
    'http://www.ixzds.com/wp-content/uploads/elementor/thumbs/newbanner3-1-nv80hnplv3ctqioa31xqcd3n780myriq7zt7nvgx1g.png'
  ];

  courses = [
    {
      title: '音乐高考(四川)',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '视听部分',
      img: 'assets/images/composer.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '视听部分',
      img: 'assets/images/composer.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '视听部分',
      img: 'assets/images/composer.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '乐理部分',
      img: 'assets/images/musicTheory.jpg'
    },
    {
      title: '音乐高考(四川)',
      desc: '视听部分',
      img: 'assets/images/composer.jpg'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
