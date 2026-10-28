import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
  protected readonly services: ServiceItem[] = [
    {
      slug: 'repair',
      icon: '🔧',
      title: 'Computer Repair',
      description: 'Diagnosis and repair for laptops and desktops, from broken screens to hardware faults.'
    },
    {
      slug: 'software-installation',
      icon: '💿',
      title: 'Software Installation',
      description: 'Installation and setup of the programs your work or study depends on.'
    },
    {
      slug: 'networking',
      icon: '🌐',
      title: 'Networking',
      description: 'Router, Wi-Fi and cabling setup for homes, shops and offices.'
    },
    {
      slug: 'it-support',
      icon: '🛠️',
      title: 'IT Support',
      description: 'Friendly, practical help when your devices or systems are not behaving.'
    },
    {
      slug: 'data-recovery',
      icon: '💾',
      title: 'Data Recovery',
      description: 'Help recovering files from failing drives and accidental deletion.'
    },
    {
      slug: 'maintenance',
      icon: '🧹',
      title: 'Maintenance',
      description: 'Cleaning, updates and checks that keep your equipment running smoothly.'
    },
    {
      slug: 'os-installation',
      icon: '🖥️',
      title: 'OS Installation',
      description: 'Fresh operating system installs and upgrades, set up and ready to use.'
    },
  ];
}