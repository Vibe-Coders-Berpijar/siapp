"use client";

import { useState } from "react";
import type { Booking } from "@/lib/seed";

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// ── Types ──────────────────────────────────────────────────────────────────────

type RoomState = "available" | "booked" | "pending" | "selected" | "utility";

interface DoorDef {
  wall: "top" | "bottom" | "left" | "right";
  pos: number;   // 0..1 along the wall from the start corner
  width?: number; // default 34
}

interface WinDef {
  wall: "top" | "bottom" | "left" | "right";
  pos: number;   // 0..1 along the wall
  len: number;   // pixel length of window
}

interface RoomDef {
  id: string;
  floor: 1 | 2;
  x: number; y: number; w: number; h: number;
  label: string;
  dims?: string;
  capacity?: number;
  equipment?: string;
  bookable: boolean;
  type: "meeting" | "lab" | "classroom" | "hall" | "utility" | "stair";
  door?: DoorDef;
  wins?: WinDef[];
}

// ── Layout constants ───────────────────────────────────────────────────────────

const COR_Y = 197;  // corridor top edge
const COR_H = 36;   // corridor height
const BOT_Y = 237;  // bottom row y

// ── Room data ──────────────────────────────────────────────────────────────────

const ROOMS_DEF: RoomDef[] = [
  // ─── Lantai 1 — top row ───────────────────────────────────────────────────
  {
    id: "Aula Gedung A", floor: 1,
    x: 8, y: 8, w: 354, h: 185,
    label: "Aula Gedung A", dims: "24 × 12 m", capacity: 200,
    equipment: "Proyektor, Sound System, Podium",
    bookable: true, type: "hall",
    door: { wall: "bottom", pos: 0.15 },
    wins: [
      { wall: "top", pos: 0.15, len: 60 },
      { wall: "top", pos: 0.55, len: 60 },
      { wall: "left", pos: 0.3, len: 50 },
      { wall: "left", pos: 0.65, len: 50 },
    ],
  },
  {
    id: "Ruang Rapat Utama", floor: 1,
    x: 366, y: 8, w: 226, h: 185,
    label: "Rapat Utama", dims: "15 × 12 m", capacity: 20,
    equipment: "Proyektor, Whiteboard, Video Conference",
    bookable: true, type: "meeting",
    door: { wall: "bottom", pos: 0.25 },
    wins: [{ wall: "top", pos: 0.25, len: 55 }, { wall: "top", pos: 0.65, len: 55 }],
  },
  {
    id: "Ruang Rapat Kecil", floor: 1,
    x: 596, y: 8, w: 226, h: 185,
    label: "Rapat Kecil", dims: "10 × 12 m", capacity: 10,
    equipment: "TV Screen, Whiteboard",
    bookable: true, type: "meeting",
    door: { wall: "bottom", pos: 0.25 },
    wins: [
      { wall: "top", pos: 0.25, len: 55 },
      { wall: "right", pos: 0.3, len: 50 },
      { wall: "right", pos: 0.65, len: 50 },
    ],
  },

  // ─── Lantai 1 — bottom row ────────────────────────────────────────────────
  {
    id: "Lab Tanah", floor: 1,
    x: 8, y: BOT_Y, w: 250, h: 185,
    label: "Lab Tanah", dims: "16 × 12 m", capacity: 15,
    equipment: "Mikroskop, Centrifuge, Oven Tanah",
    bookable: true, type: "lab",
    door: { wall: "top", pos: 0.2 },
    wins: [
      { wall: "bottom", pos: 0.2, len: 55 },
      { wall: "left", pos: 0.35, len: 50 },
    ],
  },
  { id: "_toilet1", floor: 1, x: 262,  y: BOT_Y, w: 120, h: 185, label: "Toilet / WC", bookable: false, type: "utility" },
  { id: "_stair1",  floor: 1, x: 386,  y: BOT_Y, w: 120, h: 185, label: "Tangga",       bookable: false, type: "stair"   },
  {
    id: "_lobby1", floor: 1, x: 510, y: BOT_Y, w: 312, h: 185,
    label: "Lobby / Entrance", bookable: false, type: "utility",
    wins: [{ wall: "right", pos: 0.35, len: 60 }, { wall: "bottom", pos: 0.4, len: 80 }],
  },

  // ─── Lantai 2 — top row ───────────────────────────────────────────────────
  {
    id: "Lab Komputer", floor: 2,
    x: 8, y: 8, w: 440, h: 185,
    label: "Lab Komputer", dims: "28 × 12 m", capacity: 30,
    equipment: "40 Unit PC, Proyektor, AC",
    bookable: true, type: "lab",
    door: { wall: "bottom", pos: 0.1 },
    wins: [
      { wall: "top", pos: 0.12, len: 70 },
      { wall: "top", pos: 0.45, len: 70 },
      { wall: "top", pos: 0.76, len: 60 },
      { wall: "left", pos: 0.35, len: 50 },
    ],
  },
  { id: "_dosen",   floor: 2, x: 452, y: 8,     w: 180, h: 185, label: "Ruang Dosen",  bookable: false, type: "utility" },
  { id: "_stair2a", floor: 2, x: 636, y: 8,     w: 186, h: 185, label: "Tangga",        bookable: false, type: "stair"   },

  // ─── Lantai 2 — bottom row ────────────────────────────────────────────────
  {
    id: "Ruang Kelas 201", floor: 2,
    x: 8, y: BOT_Y, w: 294, h: 185,
    label: "Kelas 201", dims: "19 × 12 m", capacity: 40,
    equipment: "Proyektor, Papan Tulis, AC",
    bookable: true, type: "classroom",
    door: { wall: "top", pos: 0.2 },
    wins: [
      { wall: "bottom", pos: 0.2, len: 60 },
      { wall: "bottom", pos: 0.65, len: 60 },
    ],
  },
  {
    id: "Ruang Kelas 202", floor: 2,
    x: 306, y: BOT_Y, w: 294, h: 185,
    label: "Kelas 202", dims: "19 × 12 m", capacity: 40,
    equipment: "Proyektor, Papan Tulis, AC",
    bookable: true, type: "classroom",
    door: { wall: "top", pos: 0.2 },
    wins: [
      { wall: "bottom", pos: 0.2, len: 60 },
      { wall: "bottom", pos: 0.65, len: 60 },
    ],
  },
  { id: "_toilet2", floor: 2, x: 604, y: BOT_Y, w: 120, h: 185, label: "Toilet / WC", bookable: false, type: "utility" },
  { id: "_stair2b", floor: 2, x: 728, y: BOT_Y, w: 94,  h: 185, label: "Tangga",       bookable: false, type: "stair"   },
];

// ── State → visual style ───────────────────────────────────────────────────────

const SC: Record<RoomState, { fill: string; stroke: string; text: string; dim: string; dot: string }> = {
  available: { fill: "#061812", stroke: "#059669", text: "#6ee7b7", dim: "#34d399", dot: "#10b981" },
  booked:    { fill: "#180707", stroke: "#dc2626", text: "#fca5a5", dim: "#f87171", dot: "#ef4444" },
  pending:   { fill: "#151000", stroke: "#d97706", text: "#fcd34d", dim: "#fbbf24", dot: "#f59e0b" },
  selected:  { fill: "#1a1400", stroke: "#C8A415", text: "#fde68a", dim: "#fcd34d", dot: "#C8A415" },
  utility:   { fill: "#0a1828", stroke: "#1a3050", text: "#2d5080", dim: "#1e3a5f", dot: "#1e3050" },
};

// ── Door path computation ──────────────────────────────────────────────────────

interface DoorShape {
  gx: number; gy: number; gw: number; gh: number;
  path: string;
}

function buildDoor(room: RoomDef): DoorShape | null {
  const d = room.door;
  if (!d) return null;
  const dw = d.width ?? 34;
  const { x, y, w, h } = room;
  const G = 3;

  switch (d.wall) {
    case "bottom": {
      const hx = x + w * d.pos, hy = y + h;
      return {
        gx: hx, gy: hy - G, gw: dw, gh: G * 2,
        path: `M ${hx},${hy} L ${hx + dw},${hy} A ${dw},${dw} 0 0,1 ${hx},${hy + dw}`,
      };
    }
    case "top": {
      const hx = x + w * d.pos, hy = y;
      return {
        gx: hx, gy: hy - G, gw: dw, gh: G * 2,
        path: `M ${hx},${hy} L ${hx + dw},${hy} A ${dw},${dw} 0 0,0 ${hx},${hy - dw}`,
      };
    }
    case "right": {
      const hx = x + w, hy = y + h * d.pos;
      return {
        gx: hx - G, gy: hy, gw: G * 2, gh: dw,
        path: `M ${hx},${hy} L ${hx},${hy + dw} A ${dw},${dw} 0 0,1 ${hx + dw},${hy}`,
      };
    }
    case "left": {
      const hx = x, hy = y + h * d.pos;
      return {
        gx: hx - G, gy: hy, gw: G * 2, gh: dw,
        path: `M ${hx},${hy} L ${hx},${hy + dw} A ${dw},${dw} 0 0,0 ${hx - dw},${hy}`,
      };
    }
  }
}

// ── Window mark computation ────────────────────────────────────────────────────

interface WinLines {
  x1: number; y1: number; x2: number; y2: number;
  ox1: number; oy1: number; ox2: number; oy2: number;
}

function buildWin(room: RoomDef, win: WinDef): WinLines {
  const { x, y, w, h } = room;
  const { wall, pos, len } = win;
  const INSET = 2.5;

  switch (wall) {
    case "top": {
      const wx = x + w * pos;
      return { x1: wx, y1: y,          x2: wx + len, y2: y,
               ox1: wx, oy1: y + INSET, ox2: wx + len, oy2: y + INSET };
    }
    case "bottom": {
      const wx = x + w * pos;
      return { x1: wx, y1: y + h,          x2: wx + len, y2: y + h,
               ox1: wx, oy1: y + h - INSET, ox2: wx + len, oy2: y + h - INSET };
    }
    case "left": {
      const wy = y + h * pos;
      return { x1: x, y1: wy,         x2: x, y2: wy + len,
               ox1: x + INSET, oy1: wy, ox2: x + INSET, oy2: wy + len };
    }
    case "right": {
      const wy = y + h * pos;
      return { x1: x + w, y1: wy,          x2: x + w, y2: wy + len,
               ox1: x + w - INSET, oy1: wy, ox2: x + w - INSET, oy2: wy + len };
    }
  }
}

// ── Props ──────────────────────────────────────────────────────────────────────

export interface FloorMapProps {
  selectedRoom: string;
  onRoomSelect: (room: string) => void;
  bookings: Booking[];
  previewDate: string;
  previewStart: string;
  previewEnd: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function FloorMap({
  selectedRoom, onRoomSelect,
  bookings, previewDate, previewStart, previewEnd,
}: FloorMapProps) {
  const [activeFloor, setActiveFloor] = useState<1 | 2>(1);
  const [hoveredId, setHoveredId]     = useState<string | null>(null);

  const start = toMin(previewStart), end = toMin(previewEnd);
  const confirmed = new Set<string>(), pendingSet = new Set<string>();

  for (const b of bookings) {
    if (b.tanggal !== previewDate || b.status === "Ditolak") continue;
    const bS = toMin(b.waktuMulai), bE = toMin(b.waktuSelesai);
    if (start < bE && end > bS) {
      if (b.status === "Dikonfirmasi") confirmed.add(b.ruangan);
      else pendingSet.add(b.ruangan);
    }
  }

  function roomState(r: RoomDef): RoomState {
    if (!r.bookable)           return "utility";
    if (r.id === selectedRoom) return "selected";
    if (confirmed.has(r.id))   return "booked";
    if (pendingSet.has(r.id))  return "pending";
    return "available";
  }

  const floorRooms = ROOMS_DEF.filter(r => r.floor === activeFloor);
  const hovered    = ROOMS_DEF.find(r => r.id === hoveredId);

  const STATUS_LABEL: Record<RoomState, string> = {
    available: "Tersedia — klik untuk booking",
    booked:    "Sudah dipesan pada slot ini",
    pending:   "Menunggu konfirmasi admin",
    selected:  "Sedang dipilih",
    utility:   "",
  };

  return (
    <div className="space-y-3">

      {/* ── Tabs + legend ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {([1, 2] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFloor(f)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFloor === f
                ? "bg-ugm-gold/20 text-ugm-gold border border-ugm-gold/40"
                : "text-white/40 hover:text-white/60 border border-white/10"
            }`}
          >
            Lantai {f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {([
            ["#10b981", "Tersedia"],
            ["#f59e0b", "Menunggu"],
            ["#ef4444", "Dipesan"],
            ["#C8A415", "Dipilih"],
          ] as [string, string][]).map(([c, l]) => (
            <span key={l} className="flex items-center gap-1.5 text-[10px] text-white/40">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── SVG floor plan ───────────────────────────────────────────────────── */}
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <svg
          viewBox="0 0 830 430"
          width="100%"
          style={{ display: "block", background: "#07111e" }}
          aria-label={`Denah Lantai ${activeFloor}`}
        >
          {/* ── Defs ─────────────────────────────────────────────────────────── */}
          <defs>
            <pattern id="fp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0b1d35" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Grid */}
          <rect width="830" height="430" fill="url(#fp-grid)" />

          {/* Building outer wall */}
          <rect x="4" y="4" width="822" height="422" rx="3"
            fill="none" stroke="#1e3a5f" strokeWidth="3" />

          {/* Corridor */}
          <rect x="8" y={COR_Y} width="814" height={COR_H}
            fill="#091525" stroke="#1a3050" strokeWidth="0.8" />
          <text x="385" y={COR_Y + COR_H / 2 + 3.5}
            textAnchor="middle" fill="#1a3a60"
            fontSize="7.5" letterSpacing="5"
            fontFamily="system-ui, sans-serif"
          >
            KORIDOR UTAMA
          </text>

          {/* ── Rooms ────────────────────────────────────────────────────────── */}
          {floorRooms.map(room => {
            const state  = roomState(room);
            const c      = SC[state];
            const isHov  = hoveredId === room.id;
            const isClick = room.bookable;
            const door   = isClick ? buildDoor(room) : null;

            return (
              <g
                key={room.id}
                onClick={() => isClick && onRoomSelect(room.id)}
                onMouseEnter={() => setHoveredId(room.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: isClick ? "pointer" : "default" }}
              >
                {/* Room fill */}
                <rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  rx="2" fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={isHov && isClick ? 2.5 : 1.8}
                />

                {/* Hover glow */}
                {isHov && isClick && (
                  <rect x={room.x} y={room.y} width={room.w} height={room.h}
                    rx="2" fill={c.stroke} opacity="0.07" />
                )}

                {/* Staircase step lines */}
                {room.type === "stair" && (() => {
                  const lines = [];
                  for (let ly = room.y + 8; ly < room.y + room.h - 4; ly += 11) {
                    lines.push(
                      <line key={ly}
                        x1={room.x + 6} y1={ly}
                        x2={room.x + room.w - 6} y2={ly}
                        stroke="#1a3050" strokeWidth="0.9"
                      />
                    );
                  }
                  return lines;
                })()}

                {/* Window marks */}
                {room.wins?.map((win, wi) => {
                  const wl = buildWin(room, win);
                  return (
                    <g key={wi}>
                      {/* Erase wall at window */}
                      <line x1={wl.x1} y1={wl.y1} x2={wl.x2} y2={wl.y2}
                        stroke={c.fill} strokeWidth="5" />
                      {/* Glass lines */}
                      <line x1={wl.x1}  y1={wl.y1}  x2={wl.x2}  y2={wl.y2}
                        stroke="#1e4a7a" strokeWidth="1.5" />
                      <line x1={wl.ox1} y1={wl.oy1} x2={wl.ox2} y2={wl.oy2}
                        stroke="#1e4a7a" strokeWidth="1" />
                    </g>
                  );
                })}

                {/* Door gap + arc */}
                {door && (
                  <>
                    <rect x={door.gx} y={door.gy} width={door.gw} height={door.gh}
                      fill={c.fill} />
                    <path d={door.path} fill="none"
                      stroke={isHov ? c.stroke : "#2a4a70"}
                      strokeWidth={isHov ? 1.5 : 1}
                      strokeDasharray={isHov ? undefined : "3,2"}
                    />
                  </>
                )}

                {/* Status dot */}
                {room.bookable && (
                  <circle cx={room.x + room.w - 12} cy={room.y + 12} r="4.5"
                    fill={c.dot} />
                )}

                {/* Room label */}
                <text
                  x={room.x + room.w / 2}
                  y={room.y + room.h / 2 - (room.dims ? 10 : 0)}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={c.text}
                  fontSize={room.w >= 350 ? "14" : room.w >= 200 ? "12" : "10"}
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {room.label}
                </text>

                {/* Dimensions sub-label */}
                {room.dims && (
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 + 10}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={c.dim} fontSize="9" opacity="0.85"
                    fontFamily="system-ui, sans-serif"
                  >
                    {room.dims}
                  </text>
                )}
              </g>
            );
          })}

          {/* ── Compass (in corridor, right side) ──────────────────────────── */}
          <g transform={`translate(795, ${COR_Y + COR_H / 2})`}>
            <line x1="0" y1="1" x2="0" y2="-13" stroke="#C8A415" strokeWidth="1.5" />
            <polygon points="0,-14 -3.5,-7 3.5,-7" fill="#C8A415" />
            <text x="0" y="-18" textAnchor="middle" fill="#C8A415"
              fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">N</text>
            <line x1="0" y1="2" x2="0" y2="12" stroke="#2d5080" strokeWidth="1" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#2d5080" strokeWidth="1" />
          </g>

          {/* Floor watermark */}
          <text x="415" y="424" textAnchor="middle" fill="#1a3050"
            fontSize="8" fontFamily="system-ui, sans-serif">
            Lantai {activeFloor} — Denah Gedung Departemen
          </text>
        </svg>

        {/* ── Rich tooltip ─────────────────────────────────────────────────── */}
        {hoveredId && hovered?.bookable && (() => {
          const state = roomState(hovered);
          return (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              <div className="bg-black/92 border border-white/15 rounded-xl px-4 py-3 text-xs flex items-start gap-4 shadow-xl"
                style={{ backdropFilter: "blur(12px)" }}>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm whitespace-nowrap">{hovered.id}</p>
                  <p className="mt-0.5 whitespace-nowrap" style={{ color: SC[state].dot }}>
                    {STATUS_LABEL[state]}
                  </p>
                </div>
                {(hovered.capacity || hovered.equipment || hovered.dims) && (
                  <div className="border-l border-white/15 pl-4 space-y-1 text-white/50 min-w-0">
                    {hovered.dims     && <p className="whitespace-nowrap">Luas: <span className="text-white/80">{hovered.dims}</span></p>}
                    {hovered.capacity && <p className="whitespace-nowrap">Kapasitas: <span className="text-white/80">{hovered.capacity} orang</span></p>}
                    {hovered.equipment && (
                      <p className="max-w-[260px] truncate">
                        Fasilitas: <span className="text-white/80">{hovered.equipment}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
