import {
  FileText, LineChart, Building2, BarChart3, TrendingUp, Briefcase,
  Coins, Globe, PieChart, BookOpen, Newspaper, Landmark,
  type LucideIcon,
} from "lucide-react";

export const SECTOR_ICONS: Record<string, LucideIcon> = {
  FileText, LineChart, Building2, BarChart3, TrendingUp, Briefcase,
  Coins, Globe, PieChart, BookOpen, Newspaper, Landmark,
};

export const SECTOR_ICON_NAMES = Object.keys(SECTOR_ICONS);

export function getSectorIcon(name?: string | null): LucideIcon {
  return (name && SECTOR_ICONS[name]) || FileText;
}
