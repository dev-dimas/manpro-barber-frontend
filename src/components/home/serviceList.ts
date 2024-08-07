export interface IServiceList {
  id: string;
  name: string;
  description?: string;
  price: string;
}

export const serviceList: IServiceList[] = [
  {
    id: 'bossmanHaircut',
    name: 'Bossman Haircut+',
    description: 'Consultation, Haircut, Washing, Vitamin, Styling Hot Towel, Massage',
    price: '35K',
  },
  {
    id: 'bossBabyHaircut',
    name: 'Boss Babby Haircut+',
    description: 'Only 0-12th',
    price: '30K',
  },
  {
    id: 'hairlightBasic',
    name: 'Hairlight Basic',
    description: 'Only bleacing',
    price: '100-150K',
  },
  {
    id: 'hairlightColour',
    name: 'Hairlight Colour',
    description: 'Consultation, Haircut, Washing, Vitamin, Styling Hot Towel, Massage',
    price: '150-200K',
  },
  {
    id: 'fullColour',
    name: 'Full Colour',
    description: 'Couloring by Matrix',
    price: '35K',
  },
  {
    id: 'blackHair',
    name: 'Black Hair',
    price: '65K',
  },
  {
    id: 'permOrCurly',
    name: 'Perm or Curly',
    description: 'By Appoinment Only',
    price: '200K',
  },
];
