'use server'

import { createClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Sign up a new user
 */
export async function signUp(formData) {
  const supabase = await createClient()
  
  const email = formData.get('email')
  const password = formData.get('password')
  const fullName = formData.get('fullName')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data, message: 'נשלח אימייל אימות. אנא בדוק את תיבת הדואר שלך.' }
}

/**
 * Sign in with email and password
 */
export async function signIn(formData) {
  const supabase = await createClient()
  
  const email = formData.get('email')
  const password = formData.get('password')

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect(data.url)
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

/**
 * Update user profile
 */
export async function updateProfile(formData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'לא מחובר' }
  }

  const updates = {
    full_name: formData.get('fullName'),
    username: formData.get('username'),
    phone: formData.get('phone'),
    bio: formData.get('bio'),
    address: formData.get('address'),
    city: formData.get('city'),
    country: formData.get('country'),
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: 'הפרופיל עודכן בהצלחה' }
}

/**
 * Get products with filters
 */
export async function getProducts({ 
  category = null, 
  search = null, 
  sort = 'newest',
  page = 1,
  limit = 12 
} = {}) {
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug),
      seller:profiles(id, username, full_name, avatar_url)
    `, { count: 'exact' })
    .eq('is_active', true)

  if (category) {
    query = query.eq('category_id', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  // Sorting
  switch (sort) {
    case 'price_low':
      query = query.order('price', { ascending: true })
      break
    case 'price_high':
      query = query.order('price', { ascending: false })
      break
    case 'popular':
      query = query.order('sales_count', { ascending: false })
      break
    case 'rating':
      query = query.order('rating_average', { ascending: false })
      break
    default: // newest
      query = query.order('created_at', { ascending: false })
  }

  // Pagination
  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return { error: error.message }
  }

  return { 
    data, 
    total: count,
    page,
    totalPages: Math.ceil(count / limit)
  }
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug),
      seller:profiles(id, username, full_name, avatar_url, bio),
      images:product_images(id, image_url, alt_text, sort_order)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    return { error: error.message }
  }

  // Increment views
  await supabase
    .from('products')
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq('id', data.id)

  return { data }
}

/**
 * Get product reviews
 */
export async function getProductReviews(productId, page = 1, limit = 10) {
  const supabase = await createClient()
  
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('reviews')
    .select(`
      *,
      buyer:profiles(id, username, full_name, avatar_url)
    `, { count: 'exact' })
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return { error: error.message }
  }

  return { data, total: count, page, totalPages: Math.ceil(count / limit) }
}

/**
 * Get categories
 */
export async function getCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

/**
 * Get user orders
 */
export async function getUserOrders(page = 1, limit = 10) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'לא מחובר' }
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(
        *,
        product:products(id, title, slug, thumbnail_url)
      )
    `, { count: 'exact' })
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return { error: error.message }
  }

  return { data, total: count, page, totalPages: Math.ceil(count / limit) }
}

/**
 * Get seller earnings
 */
export async function getSellerEarnings() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'לא מחובר' }
  }

  // Get profile with balance
  const { data: profile } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single()

  // Get recent transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  // Get total earnings
  const { data: earnings } = await supabase
    .from('order_items')
    .select('seller_earnings')
    .eq('seller_id', user.id)

  const totalEarnings = earnings?.reduce((sum, item) => sum + parseFloat(item.seller_earnings), 0) || 0

  return { 
    balance: profile?.balance || 0,
    totalEarnings,
    transactions: transactions || []
  }
}
