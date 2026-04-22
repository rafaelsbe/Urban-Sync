export type PlanTypeEnum = 'start' | 'pro' | 'elite'
export type RoleEnum = 'company_admin' | 'broker'
export type ListingTypeEnum = 'venda' | 'aluguel'
export type InterestTypeEnum = 'compra' | 'aluguel'
export type LeadStatusEnum = 'new' | 'contacted' | 'closed'
export type PropertyStatusEnum = 'available' | 'reserved' | 'sold' | 'rented' | 'inactive'
export type PropertyTypeEnum = 'casa' | 'apartamento' | 'terreno' | 'comercial'

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          email: string | null
          phone: string | null
          whatsapp_number: string | null
          logo_url: string | null
          city: string | null
          state: string | null
          plan_type: PlanTypeEnum | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          email?: string | null
          phone?: string | null
          whatsapp_number?: string | null
          logo_url?: string | null
          city?: string | null
          state?: string | null
          plan_type?: PlanTypeEnum | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          email?: string | null
          phone?: string | null
          whatsapp_number?: string | null
          logo_url?: string | null
          city?: string | null
          state?: string | null
          plan_type?: PlanTypeEnum | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          company_id: string
          full_name: string
          email: string
          phone: string | null
          role: RoleEnum
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          full_name: string
          email: string
          phone?: string | null
          role: RoleEnum
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          role?: RoleEnum
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          company_id: string
          created_by: string | null
          title: string
          slug: string | null
          code: string | null
          description: string | null
          property_type: PropertyTypeEnum | null
          listing_type: ListingTypeEnum | null
          price: number | null
          bedrooms: number
          bathrooms: number
          area_m2: number | null
          city: string | null
          state: string | null
          status: PropertyStatusEnum
          cover_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          created_by?: string | null
          title: string
          slug?: string | null
          code?: string | null
          description?: string | null
          property_type?: PropertyTypeEnum | null
          listing_type?: ListingTypeEnum | null
          price?: number | null
          bedrooms?: number
          bathrooms?: number
          area_m2?: number | null
          city?: string | null
          state?: string | null
          status?: PropertyStatusEnum
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          created_by?: string | null
          title?: string
          slug?: string | null
          code?: string | null
          description?: string | null
          property_type?: PropertyTypeEnum | null
          listing_type?: ListingTypeEnum | null
          price?: number | null
          bedrooms?: number
          bathrooms?: number
          area_m2?: number | null
          city?: string | null
          state?: string | null
          status?: PropertyStatusEnum
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          position: number
          is_cover: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          position?: number
          is_cover?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          position?: number
          is_cover?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          company_id: string
          property_id: string | null
          assigned_to: string | null
          client_name: string
          client_phone: string
          client_email: string | null
          message: string | null
          source: string | null
          interest_type: InterestTypeEnum | null
          status: LeadStatusEnum
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          property_id?: string | null
          assigned_to?: string | null
          client_name: string
          client_phone: string
          client_email?: string | null
          message?: string | null
          source?: string | null
          interest_type?: InterestTypeEnum | null
          status?: LeadStatusEnum
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          property_id?: string | null
          assigned_to?: string | null
          client_name?: string
          client_phone?: string
          client_email?: string | null
          message?: string | null
          source?: string | null
          interest_type?: InterestTypeEnum | null
          status?: LeadStatusEnum
          created_at?: string
        }
      }
      company_settings: {
        Row: {
          id: string
          company_id: string
          default_template_id: string | null
          whatsapp_number: string | null
          auto_redirect_to_whatsapp: boolean
          lead_distribution_mode: string | null
          welcome_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          default_template_id?: string | null
          whatsapp_number?: string | null
          auto_redirect_to_whatsapp?: boolean
          lead_distribution_mode?: string | null
          welcome_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          default_template_id?: string | null
          whatsapp_number?: string | null
          auto_redirect_to_whatsapp?: boolean
          lead_distribution_mode?: string | null
          welcome_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      whatsapp_templates: {
        Row: {
          id: string
          company_id: string
          name: string
          template: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          template: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          template?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      plan_type_enum: PlanTypeEnum
      role_enum: RoleEnum
      listing_type_enum: ListingTypeEnum
      interest_type_enum: InterestTypeEnum
      lead_status_enum: LeadStatusEnum
      property_status_enum: PropertyStatusEnum
      property_type_enum: PropertyTypeEnum
    }
  }
}