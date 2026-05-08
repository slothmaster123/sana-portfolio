export type Medium =
  | "Installation"
  | "Photography"
  | "Painting"
  | "Sculpture"
  | "Textile"
  | "3D Printing"
  | "Digital";

export interface Artwork {
  slug: string;
  title: string;
  year: string;
  medium: Medium;
  dimensions?: string;
  description?: string;
  project?: string;
  featured?: boolean;
  forSale?: boolean;
  price?: string;
  image?: string; // placeholder for when images are added
  aspectRatio?: string; // e.g. "4/3", "1/1", "3/4"
}

export const artworks: Artwork[] = [
  {
    slug: "exit-strategy",
    title: "Exit Strategy",
    year: "2019",
    medium: "Installation",
    dimensions: "Dimensions variable",
    description:
      "Exhibited at the National Art Gallery, PNCA, Islamabad. An installation interrogating the conditions of departure, belonging, and the bureaucracy of movement.",
    project: "exit-strategy",
    featured: true,
    aspectRatio: "4/3",
  },
  {
    slug: "from-the-other-side",
    title: "Duje Paase Ton (From the Other Side)",
    year: "2021",
    medium: "Installation",
    dimensions: "Dimensions variable",
    description:
      "Shown at The Reach, Abbotsford, Canada. Part of the South Asian Canadian Histories Association programme.",
    featured: true,
    aspectRatio: "3/2",
  },
  {
    slug: "squeeze",
    title: "Squeeze",
    year: "2023",
    medium: "Installation",
    dimensions: "Dimensions variable",
    description:
      "Exhibited at the Barbican Arts Group Trust, London. Part of the MFA practice-based research.",
    featured: true,
    aspectRatio: "4/3",
  },
  {
    slug: "lambing-season",
    title: "Lambing Season",
    year: "2022",
    medium: "Installation",
    dimensions: "Dimensions variable",
    description: "Shown at Worlding, London.",
    aspectRatio: "3/2",
  },
  {
    slug: "onrushing-5",
    title: "Onrushing 5",
    year: "2021",
    medium: "Photography",
    dimensions: "Variable",
    description: "Exhibited at Gallery 6, Islamabad.",
    featured: true,
    aspectRatio: "2/3",
  },
  {
    slug: "when-was-the-last-time",
    title: "When Was the Last Time You Saw the Sea",
    year: "2021",
    medium: "Photography",
    dimensions: "Variable",
    description: "Shown at Youkobo Art Space, Tokyo, Japan.",
    featured: true,
    aspectRatio: "3/2",
  },
  {
    slug: "surprise",
    title: "Surprise",
    year: "2023",
    medium: "Photography",
    dimensions: "Variable",
    description: "Exhibited at Somers Gallery, London.",
    aspectRatio: "2/3",
  },
  {
    slug: "arjumand-prize-work",
    title: "Untitled (Arjumand Prize)",
    year: "2021",
    medium: "Painting",
    dimensions: "Variable",
    description:
      "Merit Prize winner at the Arjumand Painting Award, Alhamra Art Centre, Lahore.",
    featured: true,
    forSale: false,
    aspectRatio: "3/4",
  },
  {
    slug: "the-winners",
    title: "Untitled (The Winners)",
    year: "2022",
    medium: "Painting",
    dimensions: "Variable",
    description: "Shown at Gallery 6, Islamabad.",
    forSale: true,
    price: "Contact for pricing",
    aspectRatio: "4/3",
  },
  {
    slug: "untitled-2023-painting",
    title: "Untitled",
    year: "2023",
    medium: "Painting",
    dimensions: "Variable",
    forSale: true,
    price: "Contact for pricing",
    aspectRatio: "3/4",
  },
  {
    slug: "untitled-sculpture-2022",
    title: "Untitled",
    year: "2022",
    medium: "Sculpture",
    dimensions: "Dimensions variable",
    aspectRatio: "3/4",
  },
  {
    slug: "untitled-sculpture-2023",
    title: "Untitled",
    year: "2023",
    medium: "Sculpture",
    dimensions: "Dimensions variable",
    aspectRatio: "4/3",
  },
  {
    slug: "untitled-textile-2022",
    title: "Untitled",
    year: "2022",
    medium: "Textile",
    dimensions: "Dimensions variable",
    description:
      "Textile work exploring inherited cloth, domestic labour, and the archive of the hand.",
    aspectRatio: "2/3",
  },
  {
    slug: "untitled-3d-2023",
    title: "Untitled",
    year: "2023",
    medium: "3D Printing",
    dimensions: "Dimensions variable",
    aspectRatio: "4/3",
  },
  {
    slug: "52-percent-spiritual",
    title: "52% Spiritual",
    year: "2022",
    medium: "Digital",
    dimensions: "Variable / screen-based",
    description:
      "A collaboration with the Digital Anthropology department at UCL. Explores augmented reality as a medium for cultural memory and lived experience.",
    project: "52-percent-spiritual",
    featured: true,
    aspectRatio: "16/9",
  },
];

export const mediums: Medium[] = [
  "Installation",
  "Photography",
  "Painting",
  "Sculpture",
  "Textile",
  "3D Printing",
  "Digital",
];

export function getByMedium(medium: Medium): Artwork[] {
  return artworks.filter((a) => a.medium === medium);
}

export function getFeatured(): Artwork[] {
  return artworks.filter((a) => a.featured);
}
