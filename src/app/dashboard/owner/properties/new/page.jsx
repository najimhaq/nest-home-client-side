// app/owner/properties/new/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Upload,
  X,
  Plus,
  DollarSign,
  MapPin,
  Home,
  Users,
  Ruler,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Check,
  ChevronDown,
  BedDouble,
  Bath,
  Wifi,
  Car,
  Snowflake,
  Utensils,
  Tv,
  WashingMachine,
  Shield,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { uploadImage } from '@/lib/uploadImage';

// ── Zod Validation Schema ─────────────────────────────────────
const propertySchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  type: z.enum(['APARTMENT', 'HOUSE', 'CONDO', 'VILLA', 'STUDIO'], {
    required_error: 'Please select property type',
  }),
  pricePerNight: z
    .string()
    .min(1, 'Price is required')
    .transform((val) => parseFloat(val))
    .pipe(z.number().min(1, 'Price must be greater than 0')),
  location: z.string().min(3, 'Location is required'),
  maxGuests: z
    .string()
    .min(1, 'Max guests is required')
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1, 'Must accommodate at least 1 guest')),
  bedrooms: z
    .string()
    .min(1, 'Bedrooms is required')
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0, 'Must be 0 or more')),
  bathrooms: z
    .string()
    .min(1, 'Bathrooms is required')
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0, 'Must be 0 or more')),
  area: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.any().optional(), // We'll handle images separately
});

// ── Amenity Options ───────────────────────────────────────────
const amenityOptions = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'ac', label: 'Air Conditioning', icon: Snowflake },
  { id: 'kitchen', label: 'Kitchen', icon: Utensils },
  { id: 'tv', label: 'TV', icon: Tv },
  { id: 'washer', label: 'Washer', icon: WashingMachine },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'cleaning', label: 'Cleaning Service', icon: Sparkles },
];

// ── Property Types ────────────────────────────────────────────
const propertyTypes = [
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'HOUSE', label: 'House' },
  { value: 'CONDO', label: 'Condo' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'STUDIO', label: 'Studio' },
];

// ── Form Input Component ──────────────────────────────────────
const FormInput = ({ label, icon: Icon, error, ...props }) => (
  <div className='space-y-1.5'>
    <label className='block text-sm font-medium text-zinc-400'>{label}</label>
    <div className='relative'>
      {Icon && (
        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600'>
          <Icon className='h-4 w-4' />
        </div>
      )}
      <input
        {...props}
        className={`w-full rounded-xl border bg-[#161614] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0e] ${
          Icon ? 'pl-10' : ''
        } ${
          error
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-white/8 focus:border-sky-500 focus:ring-sky-500/20'
        }`}
      />
    </div>
    {error && (
      <p className='text-xs text-rose-400 flex items-center gap-1'>
        <X className='h-3 w-3' />
        {error}
      </p>
    )}
  </div>
);

// ── Form Textarea Component ───────────────────────────────────
const FormTextarea = ({ label, error, ...props }) => (
  <div className='space-y-1.5'>
    <label className='block text-sm font-medium text-zinc-400'>{label}</label>
    <textarea
      {...props}
      rows={4}
      className={`w-full rounded-xl border bg-[#161614] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0e] ${
        error
          ? 'border-rose-500 focus:ring-rose-500/20'
          : 'border-white/8 focus:border-sky-500 focus:ring-sky-500/20'
      }`}
    />
    {error && (
      <p className='text-xs text-rose-400 flex items-center gap-1'>
        <X className='h-3 w-3' />
        {error}
      </p>
    )}
  </div>
);

// ── Form Select Component ─────────────────────────────────────
const FormSelect = ({ label, error, options, ...props }) => (
  <div className='space-y-1.5'>
    <label className='block text-sm font-medium text-zinc-400'>{label}</label>
    <div className='relative'>
      <select
        {...props}
        className={`w-full appearance-none rounded-xl border bg-[#161614] px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0e] ${
          error
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-white/8 focus:border-sky-500 focus:ring-sky-500/20'
        }`}
      >
        <option value='' className='bg-[#161614] text-zinc-600'>
          Select type
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className='bg-[#161614] text-white'
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none' />
    </div>
    {error && (
      <p className='text-xs text-rose-400 flex items-center gap-1'>
        <X className='h-3 w-3' />
        {error}
      </p>
    )}
  </div>
);

// ── Image Upload Component ────────────────────────────────────
const ImageUploader = ({ images, onAdd, onRemove, isUploading }) => (
  <div className='space-y-3'>
    <label className='block text-sm font-medium text-zinc-400'>
      Property Images
    </label>

    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
      {/* Existing Images */}
      <AnimatePresence>
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='relative aspect-square rounded-xl overflow-hidden border border-white/8 group'
          >
            <img
              src={img.preview || img.url}
              alt={`Property ${index + 1}`}
              className='h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <button
                type='button'
                onClick={() => onRemove(index)}
                className='p-2 rounded-full bg-rose-500/90 text-white hover:bg-rose-500 transition-colors'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
            {index === 0 && (
              <span className='absolute top-2 left-2 rounded-lg bg-sky-500/90 px-2 py-1 text-xs font-semibold text-white'>
                Cover
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Upload Button */}
      {images.length < 10 && (
        <motion.label
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-[#161614] text-zinc-500 transition-all hover:border-sky-500/50 hover:text-sky-400 hover:bg-[#1c1b19]'
        >
          {isUploading ? (
            <>
              <Loader2 className='h-6 w-6 animate-spin' />
              <span className='text-xs font-medium'>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className='h-6 w-6' />
              <span className='text-xs font-medium'>Add Image</span>
              <span className='text-[10px] text-zinc-600'>
                {images.length}/10
              </span>
            </>
          )}
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={onAdd}
            disabled={isUploading}
          />
        </motion.label>
      )}
    </div>

    <p className='text-xs text-zinc-600'>
      First image will be the cover. Max 10 images. Supported: JPG, PNG, WebP
    </p>
  </div>
);

// ── Amenity Selector Component ────────────────────────────────
const AmenitySelector = ({ selected, onToggle }) => (
  <div className='space-y-3'>
    <label className='block text-sm font-medium text-zinc-400'>Amenities</label>
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4'>
      {amenityOptions.map((amenity) => {
        const isSelected = selected.includes(amenity.id);
        return (
          <motion.button
            key={amenity.id}
            type='button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(amenity.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              isSelected
                ? 'border-sky-500/50 bg-sky-500/10 text-sky-400'
                : 'border-white/8 bg-[#161614] text-zinc-500 hover:border-white/16 hover:text-zinc-300'
            }`}
          >
            <amenity.icon className='h-4 w-4' />
            {amenity.label}
            {isSelected && <Check className='h-4 w-4 ml-auto' />}
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────
const OwnerAddNewProperties = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      amenities: [],
    },
  });

  // Handle image upload
  const handleImageAdd = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload to server
      const url = await uploadImage(file);

      // Add to images array
      const newImage = {
        file,
        url,
        preview: URL.createObjectURL(file),
      };
      setImages((prev) => [...prev, newImage]);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove image
  const handleImageRemove = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      // Revoke preview URL to avoid memory leaks
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Toggle amenity
  const handleAmenityToggle = (amenityId) => {
    setSelectedAmenities((prev) => {
      const newAmenities = prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId];
      setValue('amenities', newAmenities);
      return newAmenities;
    });
  };

  // Submit form
  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      const propertyData = {
        ...data,
        images: images.map((img) => img.url),
        amenities: selectedAmenities,
      };

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
        credentials: 'include',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Property listed successfully!');
        router.push('/dashboard/owner/properties');
      } else {
        toast.error(result.message || 'Failed to create property');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        {/* ── Header ── */}
        <div className='mb-8'>
          <Link
            href='/dashboard/owner/properties'
            className='inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-4'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Properties
          </Link>
          <h1 className='text-2xl font-bold text-white sm:text-3xl'>
            Add New Property
          </h1>
          <p className='mt-2 text-sm text-zinc-500'>
            Fill in the details below to list your property on StayNest
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='rounded-2xl border border-white/8 bg-[#161614] p-6 sm:p-8'
          >
            <h2 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
              <Home className='h-5 w-5 text-sky-400' />
              Basic Information
            </h2>
            <div className='space-y-5'>
              <FormInput
                label='Property Title'
                icon={Home}
                placeholder='e.g., Luxury Apartment with Ocean View'
                {...register('title')}
                error={errors.title?.message}
              />
              <FormTextarea
                label='Description'
                placeholder='Describe your property in detail...'
                {...register('description')}
                error={errors.description?.message}
              />
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                <FormSelect
                  label='Property Type'
                  options={propertyTypes}
                  {...register('type')}
                  error={errors.type?.message}
                />
                <FormInput
                  label='Price per Night ($)'
                  icon={DollarSign}
                  type='number'
                  step='0.01'
                  min='0'
                  placeholder='0.00'
                  {...register('pricePerNight')}
                  error={errors.pricePerNight?.message}
                />
              </div>
            </div>
          </motion.div>

          {/* Location & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='rounded-2xl border border-white/8 bg-[#161614] p-6 sm:p-8'
          >
            <h2 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
              <MapPin className='h-5 w-5 text-sky-400' />
              Location & Details
            </h2>
            <div className='space-y-5'>
              <FormInput
                label='Location'
                icon={MapPin}
                placeholder='e.g., Gulshan, Dhaka'
                {...register('location')}
                error={errors.location?.message}
              />
              <div className='grid grid-cols-2 gap-5 sm:grid-cols-4'>
                <FormInput
                  label='Max Guests'
                  icon={Users}
                  type='number'
                  min='1'
                  placeholder='0'
                  {...register('maxGuests')}
                  error={errors.maxGuests?.message}
                />
                <FormInput
                  label='Bedrooms'
                  icon={BedDouble}
                  type='number'
                  min='0'
                  placeholder='0'
                  {...register('bedrooms')}
                  error={errors.bedrooms?.message}
                />
                <FormInput
                  label='Bathrooms'
                  icon={Bath}
                  type='number'
                  min='0'
                  placeholder='0'
                  {...register('bathrooms')}
                  error={errors.bathrooms?.message}
                />
                <FormInput
                  label='Area (sqft)'
                  icon={Ruler}
                  type='number'
                  min='0'
                  placeholder='Optional'
                  {...register('area')}
                  error={errors.area?.message}
                />
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='rounded-2xl border border-white/8 bg-[#161614] p-6 sm:p-8'
          >
            <h2 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
              <ImageIcon className='h-5 w-5 text-sky-400' />
              Property Images
            </h2>
            <ImageUploader
              images={images}
              onAdd={handleImageAdd}
              onRemove={handleImageRemove}
              isUploading={isUploading}
            />
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='rounded-2xl border border-white/8 bg-[#161614] p-6 sm:p-8'
          >
            <h2 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
              <Sparkles className='h-5 w-5 text-sky-400' />
              Amenities
            </h2>
            <AmenitySelector
              selected={selectedAmenities}
              onToggle={handleAmenityToggle}
            />
          </motion.div>

          {/* Submit Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='flex items-center justify-end gap-4'
          >
            <Link
              href='/dashboard/owner/properties'
              className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#161614] px-6 py-3 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white'
            >
              <X className='h-4 w-4' />
              Cancel
            </Link>
            <motion.button
              type='submit'
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Creating Property...
                </>
              ) : (
                <>
                  <Save className='h-4 w-4' />
                  List Property
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default OwnerAddNewProperties;
