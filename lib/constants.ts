import { Printer, Palette, Monitor, Store, Phone, Mail, MapPin } from "lucide-react"

export const mainNavLinks = [
  {
    title: "Screen Printing",
    route: "/screen-printing",
    icon: Printer,
  },
  {
    title: "Embroidery",
    route: "/custom-embroidery",
    icon: Palette,
  },
  {
    title: "Digital Printing",
    route: "/digital-printing",
    icon: Monitor,
  },
  {
    title: "Merch Stores",
    route: "/merch-stores",
    icon: Store,
  },
]

export const contactInfo = [
  {
    icon: Phone,
    label: "Call us",
    value: "(845) 358-2037",
    href: "tel:+18453582037",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@rolleduptees.com",
    href: "mailto:info@rolleduptees.com",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "298 Route 59, Nyack, NY",
    href: "https://maps.app.goo.gl/BCct95bTHSLTxMyn7",
  },
]
