import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Reason {
  title: string;
  text: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  protected readonly reasons: Reason[] = [
    {
      title: 'Genuine products',
      text: 'We stock quality computers and accessories you can rely on.'
    },
    {
      title: 'Expert support',
      text: 'Our technicians help with repairs, setup and everyday IT problems.'
    },
    {
      title: 'Fair, clear pricing',
      text: 'Prices are shown up front, in Kenyan shillings.'
    },
    {
      title: 'Fast service',
      text: 'We aim to get you and your business back up and running quickly.'
    },
  ];
}