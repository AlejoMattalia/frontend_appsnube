export interface Brand {
    id: number
    name: string
    logo_url: string
}

export interface SelectBrand {
    brand: string
    setBrand: (brand: string) => void
}