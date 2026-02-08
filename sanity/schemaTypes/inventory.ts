import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string', // e.g., "2020 Kenworth T880 Dump Truck"
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Pending Sale', value: 'pending' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      initialValue: 'available'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dump Trucks', value: 'dump-trucks' },
          { title: 'Day Cabs', value: 'day-cabs' },
          { title: 'Heavy Equipment', value: 'heavy-equipment' },
          { title: 'Trailers', value: 'trailers' },
          { title: 'Parts (Phase 2)', value: 'parts' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Leave blank for "Call for Price"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
    }),
    defineField({
      name: 'hoursOrMileage',
      title: 'Hours / Mileage',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array', 
      of: [{type: 'block'}]
    })
  ],
})