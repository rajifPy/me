// src/data/photos.js

export const photos = [
  {
    id: 1,
    url: '/images/12358.png', // ✅ Path yang benar
    caption: 'Working on data projects',
    category: 'Work'
  },
  {
    id: 2,
    url: '/images/IMG_3462.jpg',
    caption: 'my TEAM',
    category: 'Work'
  },
  {
    id: 3,
    url: '/images/IMG_6719.jpg',
    caption: 'UKM Sosial Sercive, UNAIR',
    category: 'Education'
  },
  {
    id: 4,
    url: '/images/IMG_0705.jpg',
    caption: 'Collaboration with Human Initiative',
    category: 'Events'
  },
  {
    id: 5,
    url: '/images/DSC_5054.JPG',
    caption: 'Bakti Sosial on Mojokerto',
    category: 'Events'
  },
  {
    id: 6,
    url: '/images/IMG_9682.jpg',
    caption: 'Pelayanan Sosial Universitas Airlangga',
    category: 'Events'
  },
  {
    id: 7,
    url: '/images/album.jpg',
    caption: 'Coffee and coding session',
    category: 'Lifestyle'
  },
  {
    id: 8,
    url: '/images/12358.png',
    caption: 'My workspace setup',
    category: 'Lifestyle'
  },
  {
    id: 9,
    url: '/images/magang_dsi.jpeg',
    caption: 'Intern at DSI UNAIR',
    category: 'Education'
  },
  {
    id: 10,
    url: '/images/IMG-20250706-WA0074.jpg',
    caption: 'Universitas Airlangga campus',
    category: 'Education'
  },
  {
    id: 11,
    url: '/images/IMG_2713.jpg',
    caption: 'KKN',
    category: 'Education'
  },
  {
    id: 12,
    url: '/images/12358.png',
    caption: 'Final year project presentation',
    category: 'Education'
  }
]

export const photoCategories = [
  'All',
  'Work',
  'Events',
  'Lifestyle',
  'Education'
]

export const getPhotosByCategory = (category) => {
  if (category === 'All') return photos
  return photos.filter(photo => photo.category === category)
}

export const getPhotoCounts = () => {
  const counts = { All: photos.length }
  photoCategories.slice(1).forEach(category => {
    counts[category] = photos.filter(p => p.category === category).length
  })
  return counts
}
