import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  items = [
    {
      name: 'link01', 
      link: '/link01',
      label: 'LINK01'
    },
    {
      name: 'link02', 
      link: '/link02',
      label: 'LINK02'
    },
    {
      name: 'link03', 
      link: '/link03',
      label: 'LINK03'
    },
    {
      name: 'link04', 
      link: '/link04',
      label: 'LINK04'
    },
    {
      name: 'link05', 
      link: '/link05',
      label: 'LINK05'
    },
    {
      name: 'link06', 
      link: '/link06',
      label: 'LINK06'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
