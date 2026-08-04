export function ProgressMarker({
  current,
  total,
  left,
  top,
}: {
  current: number;
  total: number;
  left: number;
  top: number;
}) {
  return (
    <div
      className="absolute flex items-center gap-3"
      style={{ left, top }}
      aria-label={`Rodada ${current} de ${total}`}
    >
      <span className="text-[20px] font-bold text-[#24566B]">
        {current} de {total}
      </span>
      <span className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 rounded-full border-2 border-[#24566B]"
            style={{ background: i < current - 1 ? "#58CDB5" : i === current - 1 ? "#FFD76A" : "transparent" }}
          />
        ))}
      </span>
    </div>
  );
}
