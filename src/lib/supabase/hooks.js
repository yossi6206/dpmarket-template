'use client'

import { createClient } from './client'
import { useEffect, useState } from 'react'

/**
 * Hook to get the current user
 * @returns {{ user: object | null, loading: boolean, error: Error | null }}
 */
export function useUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, error }
}

/**
 * Hook to get user profile
 * @returns {{ profile: object | null, loading: boolean, error: Error | null }}
 */
export function useProfile() {
  const { user, loading: userLoading } = useUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (!userLoading) {
      getProfile()
    }
  }, [user, userLoading])

  return { profile, loading: loading || userLoading, error }
}

/**
 * Hook to manage cart items
 * @returns {{ cartItems: array, loading: boolean, addToCart: function, removeFromCart: function, clearCart: function }}
 */
export function useCart() {
  const { user } = useUser()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setCartItems([])
      setLoading(false)
      return
    }

    const fetchCart = async () => {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product:products (
            id,
            title,
            slug,
            price,
            sale_price,
            thumbnail_url,
            seller:profiles (
              id,
              username,
              full_name
            )
          )
        `)
        .eq('user_id', user.id)

      if (!error) {
        setCartItems(data || [])
      }
      setLoading(false)
    }

    fetchCart()
  }, [user])

  const addToCart = async (productId) => {
    if (!user) return { error: 'יש להתחבר כדי להוסיף לעגלה' }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: user.id, product_id: productId })
      .select(`
        id,
        product:products (
          id,
          title,
          slug,
          price,
          sale_price,
          thumbnail_url
        )
      `)
      .single()

    if (!error) {
      setCartItems([...cartItems, data])
    }
    return { data, error }
  }

  const removeFromCart = async (cartItemId) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (!error) {
      setCartItems(cartItems.filter(item => item.id !== cartItemId))
    }
    return { error }
  }

  const clearCart = async () => {
    if (!user) return

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (!error) {
      setCartItems([])
    }
    return { error }
  }

  return { cartItems, loading, addToCart, removeFromCart, clearCart }
}

/**
 * Hook to manage wishlist
 * @returns {{ wishlistItems: array, loading: boolean, addToWishlist: function, removeFromWishlist: function, isInWishlist: function }}
 */
export function useWishlist() {
  const { user } = useUser()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setWishlistItems([])
      setLoading(false)
      return
    }

    const fetchWishlist = async () => {
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          product:products (
            id,
            title,
            slug,
            price,
            sale_price,
            thumbnail_url,
            rating_average
          )
        `)
        .eq('user_id', user.id)

      if (!error) {
        setWishlistItems(data || [])
      }
      setLoading(false)
    }

    fetchWishlist()
  }, [user])

  const addToWishlist = async (productId) => {
    if (!user) return { error: 'יש להתחבר כדי להוסיף למועדפים' }

    const { data, error } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, product_id: productId })
      .select()
      .single()

    if (!error) {
      setWishlistItems([...wishlistItems, data])
    }
    return { data, error }
  }

  const removeFromWishlist = async (productId) => {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (!error) {
      setWishlistItems(wishlistItems.filter(item => item.product_id !== productId))
    }
    return { error }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId)
  }

  return { wishlistItems, loading, addToWishlist, removeFromWishlist, isInWishlist }
}
