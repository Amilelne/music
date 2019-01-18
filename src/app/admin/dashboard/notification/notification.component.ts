import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor() {}

  loading = false;
  data = [
    {
      title: 'Ant Design Title\'Ant Design Title 1'
    },
    { title: 'Ant Design Title\'Ant Design Title 2' },
    { title: 'Ant Design Title\'Ant Design Title 3' },
    { title: 'Ant Design Title\'Ant Design Title 4' }
  ];

  ngOnInit() {}
}
