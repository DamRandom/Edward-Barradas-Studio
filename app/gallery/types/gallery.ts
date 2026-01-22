/* ---------- Core Types ---------- */

export type Photo = {
  id: string;
  src: string;
  price: number;
  tags: string[];
};

export type Model = {
  name: string;
  bio: string;
  image?: string;
  description?: string;
};

export type Collection = {
  id: string;
  title: string;
  coverImage: string;
  tags: string[];
  fullPackPrice: number;
  discountPercent: number;
  model: Model;
  photos: Photo[];
  description?: string;
};

/* ---------- Component Props ---------- */

export type CollectionGridProps = {
  collections: Collection[];
  onSelectCollection: (collection: Collection) => void;
};

export type CollectionCardProps = {
  collection: Collection;
  onSelect: (collection: Collection) => void;
};

export type CollectionModalProps = {
  collection: Collection | null;
  onClose: () => void;
};

export type PhotoCarouselImage = Pick<Photo, "id" | "src"> & {
  alt?: string;
};

export type PhotoCarouselProps = {
  images: PhotoCarouselImage[];
  autoPlay?: boolean;
  interval?: number;
};

export type PhotoItemProps = {
  id: string;
  src: string;
  alt?: string;
  price: number;
  selected?: boolean;
  onSelect?: (id: string) => void;
};

export type PurchasePanelProps = {
  selectedCount: number;
  selectedTotal: number;
  fullPrice: number;
  discountedPrice: number;
  onBuySelected: () => void;
  onBuyFull: () => void;
};

export type GalleryToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  availableTags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
};

export type ModelInfoProps = {
  name: string;
  image: string;
  age?: number;
  location?: string;
  description: string;
};
