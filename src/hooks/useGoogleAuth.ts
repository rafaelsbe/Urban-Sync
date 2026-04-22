import { useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useGoogleAuth() {
  const supabase = createClient()

  const signInWithGoogle = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard/home`,
        },
      })

      if (error) {
        console.error('Erro ao fazer login com Google:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Erro na autenticação:', error)
      throw error
    }
  }, [supabase])

  return { signInWithGoogle }
}