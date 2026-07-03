// lib/validations/property.js
import { z } from 'zod';

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().positive('Price must be positive'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(4, 'ZIP code is required'),
  bedrooms: z.number().int().min(1),
  bathrooms: z.number().int().min(1),
  maxGuests: z.number().int().min(1),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});
