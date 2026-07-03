// lib/validations/booking.js
import { z } from 'zod';

export const bookingSchema = z
  .object({
    propertyId: z.string().cuid(),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    guests: z.number().int().min(1).max(20),
    specialRequests: z.string().optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  });
