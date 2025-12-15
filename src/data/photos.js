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
    url: '/images/12358.png',
    caption: 'Data analysis session',
    category: 'Work'
  },
  {
    id: 3,
    url: '/images/12358.png',
    caption: 'Team collaboration meeting',
    category: 'Work'
  },
  {
    id: 4,
    url: '/images/12358.png',
    caption: 'Presenting project results',
    category: 'Events'
  },
  {
    id: 5,
    url: '/images/12358.png',
    caption: 'Bangkit Academy graduation ceremony',
    category: 'Events'
  },
  {
    id: 6,
    url: '/images/12358.png',
    caption: 'Tech conference participation',
    category: 'Events'
  },
  {
    id: 7,
    url: '/images/12358.png',
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
    url: '/images/12358.png',
    caption: 'Daily routine as data enthusiast',
    category: 'Lifestyle'
  },
  {
    id: 10,
    url: '/images/12358.png',
    caption: 'Universitas Airlangga campus',
    category: 'Education'
  },
  {
    id: 11,
    url: '/images/12358.png',
    caption: 'Study group with classmates',
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
