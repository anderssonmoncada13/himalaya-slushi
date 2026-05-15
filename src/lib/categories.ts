export interface CategoryMeta {
  label: string;
  icon: string;
  gradient: string;
}

export const categoryMeta: Record<string, CategoryMeta> = {
  slushies: {
    label: 'Slushies',
    icon: '🧊',
    gradient: 'from-sky-500/20 to-cyan-400/10',
  },
  smoothies: {
    label: 'Smoothies',
    icon: '🍓',
    gradient: 'from-rose-500/20 to-pink-400/10',
  },
  'natural-juices': {
    label: 'Natural Juices',
    icon: '🍊',
    gradient: 'from-orange-500/20 to-amber-400/10',
  },
  milkshakes: {
    label: 'Milkshakes',
    icon: '🥛',
    gradient: 'from-purple-500/20 to-violet-400/10',
  },
  'protein-cups': {
    label: 'Protein Cups',
    icon: '💪',
    gradient: 'from-emerald-500/20 to-green-400/10',
  },
  'fruit-cups': {
    label: 'Fruit Cups',
    icon: '🍑',
    gradient: 'from-yellow-500/20 to-lime-400/10',
  },
  'fresh-cut-fruit': {
    label: 'Fresh Cut Fruit',
    icon: '🍉',
    gradient: 'from-red-500/20 to-rose-400/10',
  },
};
