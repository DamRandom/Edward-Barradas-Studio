/* ---------- Core Types ---------- */

export interface Photo {
  id: string;
  src: string;
  price: number;
  tags: string[];
}

export interface Model {
  name: string;
  bio: string;
  image?: string;       // ruta de la imagen del modelo
  description?: string; // descripción editorial del modelo
}

export interface Collection {
  id: string;
  title: string;
  coverImage: string;
  tags: string[];
  fullPackPrice: number;
  discountPercent: number;
  model: Model;
  photos: Photo[];
  description?: string; // opcional, usado en CollectionModal
}

/* ---------- Component Props ---------- */

export interface CollectionGridProps {
  collections: Collection[];
  onSelectCollection: (collection: Collection) => void;
}

export interface CollectionCardProps {
  collection: Collection;
  onSelect: (collection: Collection) => void;
}

export interface CollectionModalProps {
  collection: Collection | null;
  onClose: () => void;
}

export interface PhotoCarouselProps {
  images: {
    id: string;
    src: string;
    alt?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

export interface PhotoItemProps {
  photo: Photo;
  selected: boolean;
  onToggle: (id: string) => void;
}

export interface PurchasePanelProps {
  photos: Photo[];
  fullPackPrice: number;
  discountPercent: number;
}

export interface GalleryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  availableTags: string[];
}

export interface ModelInfoProps {
  name: string;
  image: string;
  description: string;
  age?: number;
  location?: string;
}
