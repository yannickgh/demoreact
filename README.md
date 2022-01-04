# pano225

tables de références:

style_musical { // filtrage
  style: [string]
}

artistes { // filtrage
  style: [string]
  artiste: (string)
  urlImage: (string)
}

pays { // paramètre général
  pays: (string)
}

lieux { // filtrage
  pays: (string)
  lieu: (string)
}

spectacle {
  z_index: (number) // si > 0 mise en avant
  style: [string]
  artiste: (string)
  pays: (string)
  lieu: (string)
  urlImage1: (string) // petite taille
  urlImage2: (string) //grande taille
  date_jour: (number)
  date_mois: (number)
  date_annee: (number)
  tels: [string]
  emails: [string]
  annule : (boolean)
}

proxy spectacle list infinite
{
  z_index: (number) // si > 0 mise en avant
  artiste:
  lieu:
  date:
  heure:
  urlImage1: (string)
  annule : (boolean)
}
