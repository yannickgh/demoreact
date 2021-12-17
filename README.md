# pano225

tables de références:

artistes {
  artiste: [string]
}

pays {
  pays: [string]
}

lieux {
  pays: [string]
  lieu: [string]
}

spectacle {
  z_index: [number]
  artiste: [string]
  lieu: [string]
  urlImage: [string]
  date_jour: [number]
  date_mois: [number]
  date-anner: [number]
  annule : [boolean]
}

proxy spectacle
{
  artiste:
  lieu:
  style:
  date:
  heure:
}

