import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  imageSrc: string;
  aspect?: number;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
};

async function getCroppedBlob(src: string, area: Area): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
  const canvas = document.createElement("canvas");
  canvas.width = area.width;
  canvas.height = area.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
  return await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92),
  );
}

export function ImageCropModal({ open, imageSrc, aspect = 3 / 4, onCancel, onConfirm }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPx, setAreaPx] = useState<Area | null>(null);
  const onComplete = useCallback((_: Area, px: Area) => setAreaPx(px), []);

  if (!open) return null;

  const confirm = async () => {
    if (!areaPx) return;
    const blob = await getCroppedBlob(imageSrc, areaPx);
    onConfirm(blob);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-navy border border-line rounded-xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-line">
          <h3 className="text-cream text-sm uppercase tracking-[0.12em]">Ajustar foto</h3>
          <button onClick={onCancel} className="text-mute hover:text-cream" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        <div className="relative w-full h-[60vh] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onComplete}
          />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <label className="text-[10px] uppercase tracking-[0.12em] text-mute flex items-center gap-3">
            Zoom
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-gold"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="btn-ghost">Cancelar</button>
            <button onClick={confirm} className="btn-primary">Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
